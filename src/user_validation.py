"""Validation and normalization for user creation payloads."""
from __future__ import annotations

import re
from typing import Any, Dict, Optional, Tuple

EMAIL_RE = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")


def normalize_email(email: str) -> str:
    return email.strip().lower()


def normalize_name(name: Any) -> Optional[str]:
    if name is None or not isinstance(name, str):
        return None
    stripped = " ".join(name.split())
    return stripped or None


def validate_user_payload(body: Any) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """Validate user creation body.

    Returns (normalized_fields, error_message).
    Server generates ids; client id and extra fields are ignored.
    """
    if not isinstance(body, dict):
        return None, "Request body must be a JSON object"

    raw_email = body.get("email")
    if raw_email is None or not isinstance(raw_email, str) or not raw_email.strip():
        return None, "email is required"

    email = normalize_email(raw_email)
    if not EMAIL_RE.match(email):
        return None, "email must be a valid email address"

    result: Dict[str, Any] = {"email": email}

    if "name" in body:
        name = normalize_name(body.get("name"))
        if name is not None:
            result["name"] = name

    # Intentionally drop id and any unrelated keys
    return result, None
