import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { userTable } from "@/lib/drizzle";
import { inArray } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
  try {
    const req = await request.json(); // Parse JSON body
    const userIds = req.user_ids; // Expecting an array of user IDs

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: "User IDs are required as an array" },
        { status: 400 }
      );
    }

    // Bulk delete users using `inArray`
    await db.delete(userTable).where(inArray(userTable.id, userIds));

    return NextResponse.json({
      message: "Users deleted successfully!",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting users from userTable:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete users",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
