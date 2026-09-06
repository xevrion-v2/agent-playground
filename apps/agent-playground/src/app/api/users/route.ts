import { NextResponse } from "next/server";

export async function GET() {
  // TODO(issue #10): Return a paginated list of users once persistence is wired in.
  // TODO(issue #10): Support filtering and sorting via query params and validate unsupported values.
  // TODO(issue #10): Return 400 for invalid query params and 500 for unexpected data-access failures.
  return NextResponse.json(
    { message: "Not implemented" },
    { status: 501 },
  );
}

export async function POST() {
  // TODO(issue #10): Create a new user from the request body after validating required fields.
  // TODO(issue #10): Return 400 for malformed payloads, 409 for duplicate unique fields, and 500 for persistence failures.
  // TODO(issue #10): Return 201 with the created user payload and any server-generated identifiers.
  return NextResponse.json(
    { message: "Not implemented" },
    { status: 501 },
  );
}
