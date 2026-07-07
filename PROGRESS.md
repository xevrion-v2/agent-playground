# PROGRESS.md — xevrion-agent-playground

> Bounty: Add API omit-empty helper (#2894)
> Bounty 金额: $50
> 分支: feature/omit-empty-helper

---

## ✅ 已完成

- [x] 创建 `apps/api/src/utils/omit-empty.ts` — 实现 omitEmpty 辅助函数
  - 移除 null / undefined / 空字符串值
  - 保留 0, false 等有效假值
  - 纯函数，不修改原对象
- [x] 创建 `apps/api/src/utils/__tests__/omit-empty.test.ts` — 10 个单元测试覆盖各种场景
- [x] 创建 `apps/api/vitest.config.ts` — vitest 配置
- [x] 创建 `apps/api/tsconfig.json` — TypeScript 配置
- [x] 修复 `apps/api/src/routes/users.ts` 中预先存在的类型错误（router 缺少类型注解）
- [x] 更新 `apps/api/package.json` — 添加 type-check / test / build 脚本
- [x] 创建 `pnpm-workspace.yaml` — pnpm workspace 支持
- [x] Harness 初始化（AGENTS.md, PROGRESS.md, setup.sh）

---

## 🔄 进行中

- (无)

---

## 📋 待办

- [x] 四条完成命令全部通过
  - ✅ type-check: `tsc --noEmit` — 通过
  - ✅ test: `vitest run` — 10/10 通过
  - ✅ lint: `echo`（无 lint 配置）— 通过
  - ✅ build: `tsc` — 通过
- [ ] 提交 PR 到上游仓库
- [ ] PR 描述：改了什么、为什么、怎么测的

---

## ⚠️ 已知问题

- pnpm v11 下 `@prisma/client` / `@prisma/engines` / `esbuild` / `prisma` 的 build scripts 在 install 时警告，但不影响功能
- `pnpm lint` 通过 workspace 脚本运行时 pnpm 会先跑 install 并报错，但不影响 lint 本身
