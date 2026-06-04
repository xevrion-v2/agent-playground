import json
import sys
import os

def update_leaderboard(user, filepath):
    if not os.path.exists(filepath):
        data = {}
    else:
        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                data = {}
                
    data[user] = data.get(user, 0) + 1
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
        f.write('\n')

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python update_leaderboard.py <username> <filepath>")
        sys.exit(1)
    update_leaderboard(sys.argv[1], sys.argv[2])
