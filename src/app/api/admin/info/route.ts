import { db, userTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    const userId =  cookies().get('user_id')?.value as string;
    const isAdmin = cookies().get('role')?.value as string;

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId!));

      if (user[0].role !== isAdmin) {
        return NextResponse.json({
          message: 'This is restricted area. Admins only!'},
        {status:403}
        )
      }
    
    if (!user) {
      return NextResponse.json(
        { message: "User Doesn't exist!" },
        { status: 400 }
      );
    }

    return NextResponse.json({
        data: user,
        success: true
    })
}