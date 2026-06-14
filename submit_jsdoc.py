import requests
TOKEN = "ghp_...REPO = "xevrion-v2/agent-playground"
URL = f"https://api.github.com/repos/{REPO}/pulls"
headers = {"Authorization": f"token {TOKEN}", "Accept": "application/vnd.github.v3+json"}
data = {
    "title": "feat: implement userService and add professional JSDoc documentation",
    "body": "Implemented the missing `userService` in `apps/api/src/services/userService.ts` and added comprehensive JSDoc comments to all methods. Also updated `routes/users.ts` to integrate the new service. Closes #1.",
    "head": "nkar123412-hub:main",
    "base": "main"
}
response = requests.post(URL, headers=headers, json=data)
print(response.json())
