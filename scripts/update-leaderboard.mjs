import fs from 'fs';
import path from 'path';

export function updateLeaderboard(filePath, username) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 2) + '\n');
  }
  let data = {};
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(content || '{}');
  } catch (err) {
    data = {};
  }
  data[username] = (data[username] || 0) + 1;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

const isMain = process.argv[1] && (
  process.argv[1].endsWith('update-leaderboard.mjs') || 
  process.argv[1].endsWith('update-leaderboard.js')
);

if (isMain) {
  const username = process.env.PR_USER;
  if (!username) {
    console.error('PR_USER environment variable is required');
    process.exit(1);
  }
  const filePath = path.resolve(process.cwd(), 'leaderboard.json');
  updateLeaderboard(filePath, username);
  console.log(`Leaderboard updated for user: ${username}`);
}
