import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  // TODO(issue #10): Look up the user by `params.id` and return the serialized record.
  // TODO(issue #10): Return 400 when the id format is invalid, 404 when no user exists, and 500 for unexpected lookup failures.
  return NextResponse.json(
    { message: `Not implemented for user ${params.id}` },
    { status: 501 },
  );
}

export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } },
) {
  // TODO(issue #10): Apply partial updates for the requested user after validating the patch payload.
  // TODO(issue #10): Return 400 for invalid ids or payloads, 404 when the user does not exist, 409 for conflicting updates, and 500 for persistence failures.
  // TODO(issue #10): Return the updated user document once the write succeeds.
  return NextResponse.json(
    { message: `Not implemented for user ${params.id}` },
    { status: 501 },
  );
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  // TODO(issue #10): Delete or soft-delete the user identified by `params.id`.
  // TODO(issue #10): Return 400 for invalid ids, 404 when the user does not exist, and 500 if deletion fails unexpectedly.
  // TODO(issue #10): Return 204 when deletion succeeds without a response body.
  return NextResponse.json(
    { message: `Not implemented for user ${params.id}` },
    { status: 501 },
  );
}
