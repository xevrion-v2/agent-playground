const fs = require('fs');
const { execSync } = require('child_process');

function runLeaderboardUpdate(user, prNumber) {
    // Simulate the GH Action shell logic
    const setup = () => {
        if (!fs.existsSync('leaderboard.json')) {
            fs.writeFileSync('leaderboard.json', '{}');
        }
    };

    const update = (user) => {
        const data = JSON.parse(fs.readFileSync('leaderboard.json', 'utf8'));
        data[user] = (data[user] || 0) + 1;
        fs.writeFileSync('leaderboard.json', JSON.stringify(data, null, 2));
    };

    setup();
    update(user);
}

// Test 1: New contributor
if (fs.existsSync('leaderboard.json')) fs.unlinkSync('leaderboard.json');
runLeaderboardUpdate('user1', 1);
const res1 = JSON.parse(fs.readFileSync('leaderboard.json', 'utf8'));
if (res1.user1 !== 1) throw new Error(`Test 1 Failed: Expected 1, got ${res1.user1}`);

// Test 2: Existing contributor
runLeaderboardUpdate('user1', 2);
const res2 = JSON.parse(fs.readFileSync('leaderboard.json', 'utf8'));
if (res2.user1 !== 2) throw new Error(`Test 2 Failed: Expected 2, got ${res2.user1}`);

// Test 3: Multiple contributors
runLeaderboardUpdate('user2', 3);
const res3 = JSON.parse(fs.readFileSync('leaderboard.json', 'utf8', 'utf8'));
if (res3.user1 !== 2 || res3.user2 !== 1) throw new Error(`Test 3 Failed: Unexpected state`);

console.log('All leaderboard tests passed!');
