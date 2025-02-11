import { db, userTable } from "@/lib/drizzle";
import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const { username, email, password } = req;

  const uid = uuid();
  cookies().set("user_id", uid);

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (user[0]) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
    const res = await db
      .insert(userTable)
      .values({
        id: cookies().get("user_id")?.value as string,
        username: username,
        email: email,
        password: hashedPassword,
        role: email === "admin@gmail.com" ? "admin" : "user",
        created: new Date(),
      })
      .returning();

    if (res[0].role == "admin") {
      cookies().set("role", "admin");
    } else {
      cookies().set("role", "user");
    }

    if (cookies().get("role")?.value == "user") {
      return NextResponse.json({
        message: 'This is restricted area. Admins only!'},
      {status:403}
    )
    }
    return NextResponse.json({
      message: "User Registered Successfully!",
      data: res,
    }, {status:200});
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user",
        error: String(error),
      },
      { status: 500 }
    );
  }
};
