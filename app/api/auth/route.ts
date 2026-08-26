import { NextRequest, NextResponse } from "next/server";

/**
 * GitHub OAuth initiation endpoint for Decap CMS.
 * Decap CMS opens this URL in a popup when the user clicks "Login with GitHub".
 */
export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new NextResponse("GitHub OAuth is not configured.", { status: 500 });
  }

  // Derive the base URL from the incoming request so this works on any domain
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const baseUrl = `${proto}://${host}`;

  const params = new URLSearchParams({
    client_id: clientId,
    scope: "repo,user",
    redirect_uri: `${baseUrl}/api/auth/callback`,
  });

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  );
}
