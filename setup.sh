#!/bin/bash
set -euo pipefail

# ============================================================
# 墨子 Harness · 环境锁定脚本
# 项目: xevrion-agent-playground
# 生成: 2026-06-30
# ============================================================

echo "🔍 检查环境..."

# --- Node 版本锁定 ---
REQUIRED_NODE_MAJOR="22"
CURRENT_NODE=$(node -v 2>/dev/null || echo "not-installed")

if [ "$CURRENT_NODE" = "not-installed" ]; then
  echo "❌ Node.js 未安装"
  exit 1
fi

CURRENT_MAJOR=$(echo "$CURRENT_NODE" | sed 's/v//' | cut -d. -f1)
if [ "$CURRENT_MAJOR" != "$REQUIRED_NODE_MAJOR" ]; then
  echo "❌ 需要 Node v${REQUIRED_NODE_MAJOR}.x，当前 $CURRENT_NODE"
  echo "   建议: nvm install $REQUIRED_NODE_MAJOR && nvm use $REQUIRED_NODE_MAJOR"
  exit 1
fi
echo "  ✅ Node: $CURRENT_NODE"

# --- 包管理器锁定 ---
PACKAGE_MANAGER="pnpm"

# --- 依赖安装（锁定版本）---
echo "📦 安装依赖..."

case "$PACKAGE_MANAGER" in
  pnpm)
    if ! command -v pnpm &>/dev/null; then
      echo "  安装 pnpm..."
      npm install -g pnpm
    fi
    echo "  pnpm: $(pnpm --version)"
    
    if [ -f "pnpm-lock.yaml" ]; then
      pnpm install --frozen-lockfile
    else
      echo "  ⚠️ 未找到 pnpm-lock.yaml，生成中..."
      pnpm install
    fi
    ;;
    
  npm)
    if [ -f "package-lock.json" ]; then
      npm ci
    else
      echo "  ⚠️ 未找到 package-lock.json，生成中..."
      npm install
    fi
    ;;
    
  yarn)
    if [ -f "yarn.lock" ]; then
      yarn install --frozen-lockfile
    else
      echo "  ⚠️ 未找到 yarn.lock，生成中..."
      yarn install
    fi
    ;;
    
  *)
    echo "❌ 未知包管理器: $PACKAGE_MANAGER"
    exit 1
    ;;
esac

echo ""
echo "✅ 环境准备完成"
echo ""
echo "下一步:"
echo "  1. 确认 AGENTS.md 已配置"
echo "  2. git checkout -b feature/xxx 创建开发分支"
echo "  3. 开始写代码"
echo "  4. 跑 Harness: echo '(跳过，非 TS 项目)' && pnpm test && pnpm lint && echo '⚠️ 无 build 命令，需手动添加'"
echo "  5. 全绿后 git commit && git push origin feature/xxx"