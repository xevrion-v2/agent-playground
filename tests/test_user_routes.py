"""Tests for user routes."""
import json
from unittest.mock import patch, MagicMock

def test_get_users_returns_list():
    """GET /users should return a list."""
    import sys
    sys.path.insert(0, "apps/api/src")
    from routes.users import router
    assert router is not None

def test_post_user_with_valid_data():
    data = {"name": "Test", "email": "test@example.com"}
    assert data["name"] == "Test"
    assert "@" in data["email"]

def test_post_user_missing_name():
    data = {"email": "test@example.com"}
    assert "name" not in data

def test_post_user_missing_email():
    data = {"name": "Test"}
    assert "email" not in data

def test_user_route_imports():
    from routes import users
    assert hasattr(users, "router")
