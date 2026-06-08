"""
Health check endpoint handler for AWS Lambda with API Gateway.

Provides a standardized health check response wrapped in a consistent envelope
with 'status' and 'data' fields. Includes comprehensive error handling,
logging, input validation, and performance optimizations.
"""

import json
import logging
import time
from dataclasses import dataclass, asdict
from enum import Enum
from typing import Any, Dict, Optional, Union
from functools import lru_cache

# Configure module logger
logger = logging.getLogger(__name__)


class HealthStatus(Enum):
    """Enumeration of possible health check statuses."""
    OK = "ok"
    ERROR = "error"
    DEGRADED = "degraded"


@dataclass(frozen=True)
class HealthData:
    """Immutable data class representing health check data."""
    healthy: bool
    service: str
    timestamp: Optional[float] = None
    version: Optional[str] = None
    error: Optional[str] = None
    latency_ms: Optional[float] = None

    def __post_init__(self) -> None:
        """Validate data after initialization."""
        if not isinstance(self.healthy, bool):
            raise ValueError("'healthy' must be a boolean")
        if not isinstance(self.service, str) or not self.service.strip():
            raise ValueError("'service' must be a non-empty string")


@dataclass(frozen=True)
class HealthResponse:
    """Immutable data class representing the health check response envelope."""
    status: HealthStatus
    data: HealthData

    def to_dict(self) -> Dict[str, Any]:
        """Convert response to dictionary, excluding None values."""
        result = {
            "status": self.status.value,
            "data": {k: v for k, v in asdict(self.data).items() if v is not None}
        }
        return result


class HealthCheckError(Exception):
    """Custom exception for health check failures."""
    pass


class InvalidEventError(HealthCheckError):
    """Exception raised for invalid event data."""
    pass


class ConfigurationError(HealthCheckError):
    """Exception raised for configuration issues."""
    pass


# Cache for static headers to avoid recreation on each invocation
@lru_cache(maxsize=1)
def _get_default_headers() -> Dict[str, str]:
    """
    Get default HTTP headers for responses.

    Returns:
        Dictionary of default headers.
    """
    return {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Cache-Control": "no-store, max-age=0",
    }


def _validate_event(event: Dict[str, Any]) -> None:
    """
    Validate the incoming event for security and correctness.

    Args:
        event: The event dictionary from API Gateway.

    Raises:
        InvalidEventError: If the event is invalid or potentially malicious.
    """
    if not isinstance(event, dict):
        raise InvalidEventError("Event must be a dictionary")

    # Check for potentially malicious payloads
    event_str = json.dumps(event)
    if len(event_str) > 1024 * 100:  # 100KB limit
        raise InvalidEventError("Event payload too large")

    # Validate HTTP method if present
    http_method = event.get("httpMethod", "").upper()
    if http_method and http_method not in ("GET", "OPTIONS"):
        raise InvalidEventError(f"Unsupported HTTP method: {http_method}")


def _validate_context(context: Any) -> None:
    """
    Validate the Lambda context object.

    Args:
        context: The Lambda context object.

    Raises:
        ConfigurationError: If context is invalid.
    """
    if context is None:
        raise ConfigurationError("Context cannot be None")
    
    # Check for required context attributes
    required_attrs = ["function_name", "function_version", "invoked_function_arn"]
    for attr in required_attrs:
        if not hasattr(context, attr):
            raise ConfigurationError(f"Context missing required attribute: {attr}")


def _create_health_data(
    healthy: bool = True,
    error: Optional[str] = None,
    start_time: Optional[float] = None
) -> HealthData:
    """
    Create health data with current timestamp and optional error.

    Args:
        healthy: Whether the service is healthy.
        error: Optional error message.
        start_time: Optional start time for latency calculation.

    Returns:
        HealthData instance.
    """
    latency_ms = None
    if start_time is not None:
        latency_ms = round((time.time() - start_time) * 1000, 2)

    return HealthData(
        healthy=healthy,
        service="api",
        timestamp=time.time(),
        version="1.0.0",
        error=error,
        latency_ms=latency_ms
    )


def create_health_response(
    status: HealthStatus = HealthStatus.OK,
    healthy: bool = True,
    error: Optional[str] = None,
    start_time: Optional[float] = None
) -> HealthResponse:
    """
    Create a standardized health check response envelope.

    Args:
        status: Health status (ok, error, degraded).
        healthy: Whether the service is healthy.
        error: Optional error message for error status.
        start_time: Optional start time for latency calculation.

    Returns:
        HealthResponse instance with status and data fields.

    Example:
        >>> response = create_health_response()
        >>> response.to_dict()
        {'status': 'ok', 'data': {'healthy': True, 'service': 'api', ...}}
    """
    health_data = _create_health_data(healthy=healthy, error=error, start_time=start_time)
    return HealthResponse(status=status, data=health_data)


def _build_http_response(
    status_code: int,
    body: Dict[str, Any],
    headers: Optional[Dict[str, str]] = None
) -> Dict[str, Any]:
    """
    Build a standardized HTTP response dictionary.

    Args:
        status_code: HTTP status code.
        body: Response body dictionary.
        headers: Optional additional headers.

    Returns:
        HTTP response dictionary.
    """
    response_headers = _get_default_headers().copy()
    if headers:
        response_headers.update(headers)

    return {
        "statusCode": status_code,
        "headers": response_headers,
        "body": json.dumps(body, ensure_ascii=False),
        "isBase64Encoded": False,
    }


def handle_health(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Handle health check requests from API Gateway.

    Processes health check requests and returns a standardized response
    with status and data fields. Includes comprehensive error handling,
    logging, and performance monitoring.

    Args:
        event: The event dictionary from API Gateway.
            Expected format: {
                "httpMethod": "GET" or "OPTIONS",
                "headers": {...},
                ...
            }
        context: The Lambda context object.
            Provides runtime information about the Lambda function.

    Returns:
        A dictionary representing the HTTP response with:
            - statusCode: HTTP status code (200, 500)
            - headers: Response headers including CORS
            - body: JSON string with health check envelope

    Raises:
        No exceptions are raised; all errors are caught and returned
        as HTTP 500 responses with error details.

    Example:
        >>> event = {"httpMethod": "GET"}
        >>> response = handle_health(event, context)
        >>> response["statusCode"]
        200
    """
    start_time = time.time()
    
    try:
        # Input validation
        _validate_event(event)
        _validate_context(context)

        # Log incoming request (sanitized)
        logger.info(
            "Health check request received",
            extra={
                "http_method": event.get("httpMethod", "UNKNOWN"),
                "request_id": getattr(context, "aws_request_id", None),
            }
        )

        # Handle OPTIONS preflight request
        if event.get("httpMethod", "").upper() == "OPTIONS":
            logger.debug("Handling OPTIONS preflight request")
            return _build_http_response(200, {})

        # Perform health check
        health_response = create_health_response(start_time=start_time)
        
        # Log successful health check
        logger.info(
            "Health check completed successfully",
            extra={
                "status": health_response.status.value,
                "latency_ms": health_response.data.latency_ms,
                "healthy": health_response.data.healthy
            }
        )

        return _build_http_response(200, health_response.to_dict())

    except InvalidEventError as e:
        logger.warning(f"Invalid event received: {str(e)}")
        error_response = create_health_response(
            status=HealthStatus.ERROR,
            healthy=False,
            error=str(e),
            start_time=start_time
        )
        return _build_http_response(400, error_response.to_dict())

    except ConfigurationError as e:
        logger.error(f"Configuration error: {str(e)}")
        error_response = create_health_response(
            status=HealthStatus.ERROR,
            healthy=False,
            error="Internal configuration error",
            start_time=start_time
        )
        return _build_http_response(500, error_response.to_dict())

    except json.JSONDecodeError as e:
        logger.error(f"JSON parsing error: {str(e)}")
        error_response = create_health_response(
            status=HealthStatus.ERROR,
            healthy=False,
            error="Invalid JSON in request",
            start_time=start_time
        )
        return _build_http_response(400, error_response.to_dict())

    except Exception as e:
        logger.exception(f"Unexpected error during health check: {str(e)}")
        error_response = create_health_response(
            status=HealthStatus.ERROR,
            healthy=False,
            error="Internal server error",
            start_time=start_time
        )
        return _build_http_response(500, error_response.to_dict())

    finally:
        # Log execution time for monitoring
        execution_time = round((time.time() - start_time) * 1000, 2)
        logger.debug(
            "Health check execution completed",
            extra={
                "execution_time_ms": execution_time,
                "function_name": getattr(context, "function_name", "unknown"),
                "function_version": getattr(context, "function_version", "unknown")
            }
        )