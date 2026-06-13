function normalizeContributor(contributor) {
  if (typeof contributor !== "string") {
    throw new TypeError("contributor must be a non-empty string");
  }

  const username = contributor.trim();
  if (!username) {
    throw new TypeError("contributor must be a non-empty string");
  }

  return username;
}

export function applyLeaderboardUpdate(leaderboard, contribution) {
  const username = normalizeContributor(contribution.contributor);
  const prNumber = contribution.prNumber ?? null;
  const currentEntry = leaderboard[username] ?? {
    contributions: 0,
    pullRequests: []
  };

  if (prNumber !== null && currentEntry.pullRequests.includes(prNumber)) {
    return { ...leaderboard, [username]: currentEntry };
  }

  return {
    ...leaderboard,
    [username]: {
      contributions: currentEntry.contributions + 1,
      pullRequests:
        prNumber === null
          ? currentEntry.pullRequests
          : [...currentEntry.pullRequests, prNumber]
    }
  };
}
