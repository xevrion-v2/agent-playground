import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/utils/pagination.ts", import.meta.url), "utf8");
const runnableSource = source
  .replace(/export interface [\s\S]*?\n}\n\n/g, "")
  .replace(/export type .*\n\n/g, "")
  .replace(/ as const/g, "")
  .replace(/: unknown/g, "")
  .replace(/: number \| null/g, "")
  .replace(/: number/g, "")
  .replace(/: PaginationQuery/g, "")
  .replace(/: PaginationOptions/g, "")
  .replace(/\): PaginationParams/g, ")")
  .replace(/\): unknown/g, ")")
  .replace(/\): number/g, ")")
  .replace(/export const /g, "const ");

const exports = {};
new Function(
  "exports",
  `${runnableSource}
exports.DEFAULT_PAGINATION = DEFAULT_PAGINATION;
exports.parsePaginationQuery = parsePaginationQuery;
exports.parsePagination = parsePagination;`
)(exports);

assert.deepEqual(exports.DEFAULT_PAGINATION, {
  page: 1,
  pageSize: 20,
  maxPageSize: 100
});

assert.deepEqual(exports.parsePaginationQuery({}), {
  page: 1,
  pageSize: 20,
  limit: 20,
  offset: 0
});

assert.deepEqual(exports.parsePaginationQuery({ page: "3", pageSize: "25" }), {
  page: 3,
  pageSize: 25,
  limit: 25,
  offset: 50
});

assert.deepEqual(exports.parsePaginationQuery({ page: "2", limit: "15" }), {
  page: 2,
  pageSize: 15,
  limit: 15,
  offset: 15
});

assert.deepEqual(exports.parsePaginationQuery({ page_size: "8", offset: "24" }), {
  page: 1,
  pageSize: 8,
  limit: 8,
  offset: 24
});

assert.deepEqual(
  exports.parsePaginationQuery(
    { page: "-2", pageSize: "500", limit: "500", offset: "-1" },
    { defaultPageSize: 10, maxPageSize: 50 }
  ),
  {
    page: 1,
    pageSize: 50,
    limit: 50,
    offset: 0
  }
);

assert.equal(exports.parsePagination, exports.parsePaginationQuery);
console.log("Pagination helper exports and behavior verified.");
