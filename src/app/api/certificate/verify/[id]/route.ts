import { jsonError, jsonSuccess } from "@/lib/api/response";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params;

  if (!id || id.length < 6) {
    return jsonError("Invalid certificate ID.", 400);
  }

  // TODO: Look up certificate in Sanity/CMS when portal is implemented.
  return jsonSuccess({
    id,
    valid: false,
    message: "Certificate verification will be available when the member portal launches.",
  });
}
