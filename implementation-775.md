# Implementation for #775

See issue #775 for details.

/bounty $50

References #33.

## Problem

The PI challenge issue template declares the default bounty amount twice:

```md
## Bounty Amount

$50

/bounty $50
```

The slash-command marker is the machine-readable form required by #33, while the plain `$50` line is a second editable source of truth. If one value changes and the other does not, new PI challenge issues can contain inconsistent bounty amounts.

## Expected behavior

The template should keep a single default bounty declaration using t