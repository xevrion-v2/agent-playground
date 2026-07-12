"""Regression tests for user creation payload validation."""
import unittest

from src.user_validation import validate_user_payload


class TestUserValidation(unittest.TestCase):
    def test_reject_non_object_json_bodies(self):
        for body in (None, [], "string", 42, True):
            data, err = validate_user_payload(body)
            self.assertIsNone(data)
            self.assertIn("JSON object", err)

    def test_require_valid_email(self):
        data, err = validate_user_payload({})
        self.assertIsNone(data)
        self.assertIn("email", err.lower())

        data, err = validate_user_payload({"email": ""})
        self.assertIsNone(data)

        data, err = validate_user_payload({"email": "not-an-email"})
        self.assertIsNone(data)
        self.assertIn("valid", err.lower())

    def test_normalize_email_and_name(self):
        data, err = validate_user_payload(
            {"email": "  User@Example.COM  ", "name": "  Jane   Doe  "}
        )
        self.assertIsNone(err)
        self.assertEqual(data["email"], "user@example.com")
        self.assertEqual(data["name"], "Jane Doe")

    def test_ignore_client_id_and_extra_fields(self):
        data, err = validate_user_payload(
            {
                "email": "a@b.co",
                "id": "client-controlled-id",
                "role": "admin",
                "extra": True,
            }
        )
        self.assertIsNone(err)
        self.assertEqual(data, {"email": "a@b.co"})
        self.assertNotIn("id", data)
        self.assertNotIn("role", data)
        self.assertNotIn("extra", data)


if __name__ == "__main__":
    unittest.main()
