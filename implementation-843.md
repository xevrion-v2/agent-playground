# Implementation for #843

See issue #843 for details.

Parent bounty: #33

## Bug

`.github/workflows/auto-process.yml` currently uses `concurrency.cancel-in-progress: false` for the shared `leaderboard-json-update` group. If multiple pull request events run at the same time, each run can read the same `leaderboard.json`, increment independently, and then the later push can overwrite the earlier count.

## Expected

Leaderboard updates should be serialized so concurrent workflow runs do not race and lose PR counts.

## Scope

Change only `.github/wo