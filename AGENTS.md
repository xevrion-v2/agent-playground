# AGENTS.md — xevrion-agent-playground

> 墨子 Harness · 自动生成于 2026-06-30

---

## 项目说明

- **项目名称**: xevrion-agent-playground
- **仓库地址**: https://github.com/xevrion-v2/agent-playground.git
- **技术栈**: Node.js / TypeScript (pnpm workspace monorepo)
- **Bounty链接**: https://github.com/xevrion-v2/agent-playground/issues/2894
- **任务目标**: 在 `apps/api/src/utils/omit-empty.ts` 中添加一个辅助函数，从对象中移除 null、undefined 和空字符串值。
  - 函数签名应导出为 `omitEmpty<T extends Record<string, unknown>>(obj: T): Partial<T>`
  - 纯函数，无副作用，无外部依赖
  - 需要单元测试
  - 符合现有 TS 风格

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

1. **类型检查** — `pnpm --filter @taskflow/api exec tsc --noEmit`
2. **测试** — `pnpm --filter @taskflow/api exec vitest run`
3. **Lint** — `pnpm lint`
4. **构建** — `pnpm --filter @taskflow/api exec tsc`

**额外要求**:
- [ ] 本地手动验证功能正常
- [✓] PR 描述清晰：改了什么、为什么、怎么测的
- [ ] PROGRESS.md 已更新
