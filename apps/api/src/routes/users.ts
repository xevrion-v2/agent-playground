import { Router } from "express";
import { z } from "zod";

const router = Router();

// 验证 schema：只保留服务端可控字段，忽略客户端传入的 id 和未知字段
const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

// 规范化 email（转小写并trim）
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// 从请求体中提取安全字段
function extractSafeUserFields(body: unknown) {
  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
    };
  }

  const { email, name } = parsed.data;

  return {
    success: true as const,
    data: {
      email: normalizeEmail(email),
      ...(name !== undefined ? { name: name.trim() } : {}),
    },
  };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  // 1. 拒绝非对象 JSON 主体
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    return res.status(400).json({
      data: null,
      message: "Invalid request body. Expected a JSON object.",
    });
  }

  // 2. 验证并提取安全字段
  const result = extractSafeUserFields(req.body);

  if (!result.success) {
    return res.status(400).json({
      data: null,
      message: `Validation failed: ${result.error}`,
    });
  }

  // 3. 生成服务端 id（忽略客户端传入的 id）
  const userId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  return res.status(201).json({
    data: {
      id: userId,
      ...result.data,
    },
    message: "User created successfully.",
  });
});

export default router;
