const fs = require('fs');

function updateLeaderboard(filePath, username) {
  let data = {};
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    if (fileContent.trim() !== '') {
      try {
        data = JSON.parse(fileContent);
      } catch (e) {
        data = {};
      }
    }
  }

  data[username] = (data[username] || 0) + 1;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

module.exports = updateLeaderboard;

if (require.main === module) {
  const filePath = process.argv[2];
  const username = process.argv[3];
  if (!filePath || !username) {
    console.error('Usage: node updateLeaderboard.js <path-to-json> <username>');
    process.exit(1);
  }
  updateLeaderboard(filePath, username);
}
