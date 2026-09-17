from typing import Any, Dict, Optional

class UserService:
    """Service class for managing user entities and business logic."""

    def __init__(self) -> None:
        """Initializes the service with an empty in-memory store."""
        self._store: Dict[str, Dict[str, Any]] = {}

    def create_user(self, name: str, email: str) -> Dict[str, Any]:
        """Adds a new user entry to the store using the email as key.

        Args:
            name: The full name of the user.
            email: The unique identifier for the user record.

        Returns:
            The created user object containing name and email.
        """
        self._store[email] = {"name": name, "email": email}
        return self._store[email]

    def get_user(self, email: str) -> Optional[Dict[str, Any]]:
        """Fetches a user object based on the unique email address.

        Args:
            email: The email key to look up in the store.

        Returns:
            The user dict if found, or None if not present.
        """
        return self._store.get(email)

    def delete_user(self, email: str) -> bool:
        """Removes a user from the store if it exists.

        Args:
            email: The email key to remove from the store.

        Returns:
            True if the user was removed, False if missing.
        """
        return self._store.pop(email, None)