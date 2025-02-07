import { allOrdersQuery } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await client.fetch(allOrdersQuery);

  if (!data) {
    return NextResponse.json(
      { message: "Orders Data not found!" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    data,
    success:true
    
  }, { status: 200 });
}