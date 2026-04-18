import { NextResponse } from "next/server";
import { getPublicProjectBySlug } from "@/lib/queries";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: RouteParams) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ project });
}
