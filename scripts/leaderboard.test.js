const { updateScore, addContributor } = require("./leaderboard");

describe("leaderboard update script", () => {
  describe("updateScore", () => {
    it("adds a new contributor with score 1", () => {
      const board = {};
      const result = updateScore(board, "newuser", 1);
      expect(result).toEqual({ newuser: 1 });
    });

    it("increments existing contributor score", () => {
      const board = { alice: 5 };
      const result = updateScore(board, "alice", 1);
      expect(result).toEqual({ alice: 6 });
    });

    it("increments by custom amount", () => {
      const board = { bob: 3 };
      const result = updateScore(board, "bob", 5);
      expect(result).toEqual({ bob: 8 });
    });

    it("does not mutate the original board", () => {
      const board = { carol: 2 };
      const result = updateScore(board, "carol", 1);
      expect(board).toEqual({ carol: 2 });
      expect(result).toEqual({ carol: 3 });
    });

    it("throws on empty username", () => {
      expect(() => updateScore({}, "", 1)).toThrow("non-empty string");
    });

    it("throws on negative increment", () => {
      expect(() => updateScore({}, "user", -1)).toThrow("non-negative");
    });
  });

  describe("addContributor", () => {
    it("adds a new contributor with initial score 1", () => {
      const board = {};
      const result = addContributor(board, "newuser");
      expect(result).toEqual({ newuser: 1 });
    });

    it("does not change existing contributor", () => {
      const board = { existing: 10 };
      const result = addContributor(board, "existing");
      expect(result).toEqual({ existing: 10 });
    });
  });
});
