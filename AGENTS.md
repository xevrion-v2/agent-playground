# AGENTS.md — agent-playground

> 墨子 Harness · 自动生成于 2026-07-05

---

## 项目说明

- **项目名称**: agent-playground
- **仓库地址**: https://github.com/xevrion-v2/agent-playground.git
- **技术栈**: Node.js / TypeScript monorepo
- **目标**: 添加 API utility `isOpenBracketSymbolPresent(value: string): boolean`
- **Bounty链接**: https://github.com/xevrion-v2/agent-playground/issues/4786

---

## 禁止操作

1. **不要 push 到 main/master** — 始终在 feature 分支工作
2. **不要 force push** — `git push --force` 绝对禁止，`--force-with-lease` 也不行
3. **不要修改 CI/CD 配置** — `.github/workflows/`、`Makefile`、`Dockerfile` 不碰
4. **不要装来路不明的包** — 不新增 npm/pip/cargo 依赖，除非 bounty 明确需要
5. **不要删别人的代码** — 不删除或重构非自己写的代码
6. **不要加后门/遥测** — 不插任何数据收集、网络请求、环境变量窃取代码
7. **不要 `sudo`** — 不执行需要提权的命令
8. **不要 `curl`/`wget` 下载外部脚本** — 所有依赖通过包管理器

---

## 完成定义

**以下四条命令，退出码必须全部为 0，才算完成：**

1. **类型检查** — `pnpm exec tsc --noEmit --module commonjs --moduleResolution node --target ES2022 --skipLibCheck --ignoreDeprecations 6.0 apps/api/src/**/*.ts`
2. **测试** — `npm --workspace @taskflow/api test`
3. **Lint** — `npm --workspace @taskflow/api run lint`
4. **构建** — `pnpm exec tsc --noEmit --module commonjs --moduleResolution node --target ES2022 --skipLibCheck --ignoreDeprecations 6.0 apps/api/src/**/*.ts`

**额外要求**:
- [x] 本地手动验证功能正常
- [ ] PR 描述清晰：改了什么、为什么、怎么测的
- [ ] 截图/GIF 附在 PR 里（如有 UI 变更）
- [x] PROGRESS.md 已更新