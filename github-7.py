from flask import Flask, jsonify
import logging

app = Flask(__name__)

# Custom exceptions
class APIError(Exception):
    def __init__(self, message, status_code=500, payload=None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.payload = payload

class ValidationError(APIError):
    def __init__(self, message, payload=None):
        super().__init__(message, 400, payload)

class NotFoundError(APIError):
    def __init__(self, message, payload=None):
        super().__init__(message, 404, payload)

class UnauthorizedError(APIError):
    def __init__(self, message, payload=None):
        super().__init__(message, 401, payload)

# Error handler decorator
def handle_errors(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except APIError as e:
            response = jsonify({
                'error': e.message,
                'status_code': e.status_code,
                'payload': e.payload
            })
            response.status_code = e.status_code
            return response
        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            response = jsonify({
                'error': 'Internal server error',
                'status_code': 500
            })
            response.status_code = 500
            return response
    wrapper.__name__ = func.__name__
    return wrapper

# Global error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Not found',
        'status_code': 404
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error',
        'status_code': 500
    }), 500

# Example usage
@app.route('/users/<int:user_id>')
@handle_errors
def get_user(user_id):
    if user_id <= 0:
        raise ValidationError("User ID must be positive")
    if user_id > 1000:
        raise NotFoundError("User not found")
    return jsonify({'user_id': user_id, 'name': 'John Doe'})

@app.route('/admin')
@handle_errors
def admin_endpoint():
    raise UnauthorizedError("Admin access required")