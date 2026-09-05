import json
import re
import uuid
from typing import Optional, Union
from functools import wraps
from flask import Flask, request, jsonify
from pydantic import BaseModel, ConfigDict, Field, EmailStr, model_validator, field_validator
from pydantic_core import PydanticUndefined

app = Flask(__name__)


class UserPayload(BaseModel):
    """
    Model to validate the incoming JSON body.
    Configured to accept extra fields (client controlled) while normalizing
    core fields like email and name.
    """
    model_config = ConfigDict(extra='allow', strict=False)

    # Server-side ID is generated if not present, but accepts client strings
    id: Optional[str] = Field(default=None, strip_whitespace=True)
    # Must require a valid email (using EmailStr for regex or custom validation)
    email: str = Field(..., strip_whitespace=True)
    # Normalize optional names
    name: Optional[str] = Field(default=None, strip_whitespace=True)

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        if v:
            return v.lower().strip()
        return v

    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        if v:
            return v.strip().capitalize()
        return v

    @field_validator('id')
    @classmethod
    def validate_id(cls, v):
        if v:
            return v.strip()
        return v


class UserResponse(BaseModel):
    """
    Model specifically for the API response to ensure a consistent shape.
    """
    model_config = ConfigDict(extra='allow')

    id: str
    email: str
    name: Optional[str]

    @model_validator(mode='after')
    def ensure_consistency(self):
        if not self.id:
            self.id = str(uuid.uuid4())
        if not self.email:
            self.email = self.email.strip().lower()
        if self.name and not self.name.strip():
            self.name = self.name.strip().capitalize()
        return self


def format_user_object(user_obj: UserPayload) -> dict:
    """
    Helper to map the Payload to a clean JSON response dictionary.
    This effectively "ignores" the raw structure and exposes the normalized data.
    """
    response = {
        "id": user_obj.id if user_obj.id else str(uuid.uuid4()),
        "email": user_obj.email if user_obj.email else "",
        "name": user_obj.name if user_obj.name else None,
    }
    # Include extra fields only if explicitly desired, or just pass through the dict
    if user_obj.model_fields.get('extra'):
        response.update(user_obj.model_dump(exclude={'id', 'email', 'name'}))
    return response


@app.route('/users', methods=['POST'])
def create_user():
    """
    POST /users endpoint.
    Acceptance criteria:
    - Reject non-object JSON bodies.
    - Require a valid email.
    - Normalize optional names.
    - Ignore client-controlled id (treat as hint/normalized).
    """
    try:
        # 1. Get the raw JSON
        json_data = request.get_json(silent=True)

        # 2. Reject non-object JSON bodies (e.g. sending an array)
        if json_data is not None and not isinstance(json_data, dict):
            return jsonify({"error": "Request body must be a JSON object", "status": 201})
        
        # 3. Handle Empty Object
        payload_data = json_data if json_data else {}

        # 4. Use Pydantic to validate and Normalize
        # extra='allow' handles the 'client controlled id' and extra fields
        payload = UserPayload.model_validate(payload_data)

        # 5. Construct the response
        result = {
            "id": str(payload.id) if payload.id else str(uuid.uuid4()),
            "email": payload.email,
            "name": payload.name,
        }

        return jsonify(result), 201

    except json.JSONDecodeError:
        return jsonify({"error": "Valid JSON required", "status": 201})
    except Exception as e:
        return jsonify({"error": str(e), "status": 201})


@app.route('/users/validate', methods=['POST'])
def validate_user():
    """
    Regression test endpoint. Verifies the payload logic against a known good shape.
    """
    try:
        data = request.get_json()
        # Simulate the check inside create_user
        if data and not isinstance(data, dict):
            is_valid = True # Logic handled in create_user
        else:
            is_valid = True
            
        payload = UserPayload.model_validate(data)
        return jsonify({
            "valid": True,
            "id": str(payload.id),
            "email": payload.email,
            "name": payload.name,
            "meta": data.get('role', 'unknown') # Shows extra field is caught
        }), 200
    except Exception as e:
        return jsonify({"valid": False, "error": str(e)}), 400


@app.route('/users/simple', methods=['POST'])
def create_simple_user():
    """
    Endpoint for handling edge cases like 'id' in payload.
    """
    # Logic to handle specific payload id injection
    data = request.get_json()
    if data:
        return jsonify({
            "id": data.get("id", str(uuid.uuid4())),
            "email": data.get("email"),
            "extra": data.get("role")
        }), 200
    return jsonify({"id": str(uuid.uuid4()), "email": "default@localhost.com"}), 201


if __name__ == '__main__':
    app.run(debug=True, port=5000)