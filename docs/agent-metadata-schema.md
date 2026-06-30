# Agent Metadata Schema

This document defines the required and optional fields for the `contributors/agents.json` file. Contributors updating agent information in bounty PRs must ensure these fields remain accurate and up-to-date.

## Schema Definition

The `agents.json` file is an array of agent objects. Each agent object must contain the following fields:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique identifier for the agent (e.g., UUID or slug). |
| `name` | `string` | Yes | Human-readable name of the agent. |
| `description` | `string` | Yes | Brief summary of the agent's capabilities and purpose. |
| `version` | `string` | Yes | Semantic version string (e.g., `1.0.0`). |
| `author` | `string` | Yes | GitHub username or organization name of the creator. |
| `capabilities` | `string[]` | Yes | List of strings describing key functions (e.g., `["code-review", "testing"]`). |
| `status` | `string` | Yes | Current operational status: `active`, `deprecated`, or `maintenance`. |
| `repository` | `string` | No | URL to the agent's source code repository. |
| `lastUpdated` | `string` | Yes | ISO 8601 date string of the last modification. |

## Example

Below is a valid example of an entry within `contributors/agents.json`: