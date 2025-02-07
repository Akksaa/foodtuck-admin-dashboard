import { allProductsQuery } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import { FoodProduct } from "@/types/FoodProduct";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await client.fetch<FoodProduct[]>(allProductsQuery);

  if (!data) {
    return NextResponse.json(
      { message: "Products Data not found!" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    data,
  });
}
