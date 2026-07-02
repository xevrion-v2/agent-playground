# Leaderboard Update

This package provides a small helper for updating the TaskFlow leaderboard.

Approach:

- Treat the leaderboard as a plain object mapping usernames to counts.
- Increment an existing contributor by 1.
- Initialize a new contributor at 1.
- Keep the function pure so it is easy to unit test.

Example:

```js
import { updateLeaderboard } from "./src/index.js";

updateLeaderboard({ wisdom518: 2 }, "wisdom518");
// { wisdom518: 3 }
```
