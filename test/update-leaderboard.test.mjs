import assert from "node:assert/strict";
import test from "node:test";

import { applyLeaderboardUpdate } from "../scripts/update-leaderboard.mjs";

test("adds a new contributor with an initial contribution", () => {
  const result = applyLeaderboardUpdate({}, {
    contributor: "modelsbridgeaicom-ship-it",
    prNumber: 971
  });

  assert.deepEqual(result, {
    "modelsbridgeaicom-ship-it": {
      contributions: 1,
      pullRequests: [971]
    }
  });
});

test("increments an existing contributor without changing other entries", () => {
  const result = applyLeaderboardUpdate(
    {
      "modelsbridgeaicom-ship-it": {
        contributions: 1,
        pullRequests: [970]
      },
      "xevrion-v2": {
        contributions: 3,
        pullRequests: [1, 2, 3]
      }
    },
    {
      contributor: "modelsbridgeaicom-ship-it",
      prNumber: 971
    }
  );

  assert.deepEqual(result, {
    "modelsbridgeaicom-ship-it": {
      contributions: 2,
      pullRequests: [970, 971]
    },
    "xevrion-v2": {
      contributions: 3,
      pullRequests: [1, 2, 3]
    }
  });
});

test("does not count the same pull request twice", () => {
  const leaderboard = {
    "modelsbridgeaicom-ship-it": {
      contributions: 1,
      pullRequests: [971]
    }
  };

  assert.deepEqual(
    applyLeaderboardUpdate(leaderboard, {
      contributor: "modelsbridgeaicom-ship-it",
      prNumber: 971
    }),
    leaderboard
  );
});

test("trims contributor names before updating", () => {
  const result = applyLeaderboardUpdate({}, {
    contributor: "  modelsbridgeaicom-ship-it  ",
    prNumber: 971
  });

  assert.deepEqual(Object.keys(result), ["modelsbridgeaicom-ship-it"]);
});

test("rejects blank contributor names", () => {
  assert.throws(
    () => applyLeaderboardUpdate({}, { contributor: "   ", prNumber: 971 }),
    /contributor must be a non-empty string/
  );
});
