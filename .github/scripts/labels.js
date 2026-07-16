const fs = require("fs");

function stripQuotes(value) {
  return value.trim().replace(/^"|"$/g, "");
}

function parseLabels(content) {
  const labels = [];
  let current = null;

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    if (line.startsWith("- name:")) {
      if (current) {
        labels.push(current);
      }

      current = {
        name: stripQuotes(line.replace("- name:", ""))
      };
      continue;
    }

    if (!current) {
      continue;
    }

    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = stripQuotes(line.slice(separatorIndex + 1));
    current[key] = value;
  }

  if (current) {
    labels.push(current);
  }

  return labels;
}

async function ensureLabels({ github, context, core, labelsPath = ".github/labels.yml" }) {
  const labels = parseLabels(fs.readFileSync(labelsPath, "utf8"));

  for (const label of labels) {
    const color = label.color.replace(/^#/, "");
    const description = label.description || "";

    try {
      await github.rest.issues.createLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        name: label.name,
        color,
        description
      });
      core.info(`Created label: ${label.name}`);
    } catch (error) {
      if (error.status !== 422) {
        throw error;
      }

      await github.rest.issues.updateLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        name: label.name,
        color,
        description
      });
      core.info(`Updated label: ${label.name}`);
    }
  }
}

module.exports = {
  ensureLabels,
  parseLabels
};
