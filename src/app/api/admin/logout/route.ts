import { db, userTable } from "@/lib/drizzle"; 
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
   
    try {
        const { userId } = await request.json();

        if (!userId) {
          return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }
    
        await db.delete(userTable).where(eq(userTable.id, userId));
        cookies().delete("user_id");
        cookies().delete("role")
        
        const response = NextResponse.json({
            message: "Logged Out successfully!",
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