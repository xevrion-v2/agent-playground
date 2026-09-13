import { createUser, listUsers } from "./userService";

describe("userService", () => {
  it("listUsers returns empty data array", () => {
    const result = listUsers();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data).toHaveLength(0);
    expect(result.message).toMatch(/not implemented/i);
  });

  it("createUser echoes input with stub id", () => {
    const result = createUser({ email: "a@b.com", name: "Ada" });
    expect(result.data.id).toBe("stub-user-id");
    expect(result.data.email).toBe("a@b.com");
    expect(result.data.name).toBe("Ada");
    expect(result.message).toMatch(/not implemented/i);
  });
});
