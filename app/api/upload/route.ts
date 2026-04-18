import { NextResponse } from "next/server";
import { ensureAdminRequest } from "@/lib/guards";
import { uploadImageBuffer } from "@/lib/cloudinary";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export async function POST(request: import("next/server").NextRequest) {
  const session = await ensureAdminRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed" }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "Image is larger than 5 MB" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadImageBuffer(buffer);

    return NextResponse.json({ ok: true, url: uploaded.secure_url });
  } catch {
    return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 502 });
  }
}
