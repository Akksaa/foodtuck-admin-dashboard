import { db, userTable } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function GET() {
  const users = await db.select().from(userTable);

  if (!users) {
    return NextResponse.json(
      { message: "User Doesn't exist!" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    users,
    success: true,
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const req = request.nextUrl;
    const userId = req.searchParams.get("user_id") as string;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await db.delete(userTable).where(eq(userTable.id, userId));
    cookies().delete("user_id");

    const response = NextResponse.json({
      message: "User Deleted successfully!",
      success: true,
    });

    return response;
  } catch (error) {
    console.error("Error deleting data from userTable:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user data",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
