import { NextResponse } from "next/server";

import {
  CAMPS_PAGE_SIZE,
  getCampSummariesPage,
} from "@/lib/content/camp-summaries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const year = searchParams.get("year") ?? "";
  const district = searchParams.get("district") ?? "";
  const q = searchParams.get("q") ?? "";

  const result = await getCampSummariesPage({
    page: Number.isFinite(page) ? page : 1,
    pageSize: CAMPS_PAGE_SIZE,
    year: year || undefined,
    district: district || undefined,
    q: q || undefined,
  });

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
