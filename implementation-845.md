# Implementation for #845

See issue #845 for details.

Parent bounty: #33

## Bug

`.github/workflows/create-labels.yml` catches the 422 response from `github.rest.issues.createLabel()` and then tries to update the existing label with `github.rest.issues.updateLabel()`. However, the update call only passes `name`. Octokit/GitHub REST expects `current_name` to identify the existing label, with `name` as the desired new label name.

That means the workflow can create missing labels, but the update path for labels that already exist fails instead of re