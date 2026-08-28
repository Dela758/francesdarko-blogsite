import { NextRequest, NextResponse } from "next/server";

/**
 * GitHub OAuth callback endpoint for Decap CMS.
 * GitHub redirects here after the user authorises the OAuth app.
 * We exchange the code for an access token and pass it back to
 * the CMS popup via postMessage.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return buildHtmlResponse("error", { message: error });
  }

  if (!code) {
    return buildHtmlResponse("error", { message: "No code provided by GitHub." });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return buildHtmlResponse("error", { message: "OAuth credentials not configured." });
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const data = (await tokenRes.json()) as { access_token?: string; error?: string; error_description?: string };

    if (data.error || !data.access_token) {
      return buildHtmlResponse("error", {
        message: data.error_description ?? data.error ?? "Token exchange failed.",
      });
    }

    return buildHtmlResponse("success", {
      token: data.access_token,
      provider: "github",
    });
  } catch (err) {
    return buildHtmlResponse("error", { message: String(err) });
  }
}

/**
 * Sends the auth result back to the Decap CMS popup via postMessage.
 * Decap CMS listens for messages in the format:
 *   "authorization:github:success:{token, provider}"
 *   "authorization:github:error:{message}"
 */
function buildHtmlResponse(status: "success" | "error", payload: Record<string, string>) {
  const content =
    status === "success"
      ? `authorization:github:success:${JSON.stringify(payload)}`
      : `authorization:github:error:${JSON.stringify(payload)}`;

  const html = `<!doctype html>
<html>
<head><title>Authenticating…</title></head>
<body>
<script>
  (function () {
    function receiveMessage(e) {
      console.log("Decap CMS auth handshake received:", e);
      if (!e.data || typeof e.data !== "string" || !e.data.match(/^authorizing:github$/)) {
        return;
      }
      const content = ${JSON.stringify(content)};
      window.opener.postMessage(content, e.origin);
      window.removeEventListener("message", receiveMessage, false);
      window.close();
    }

    window.addEventListener("message", receiveMessage, false);

    // Initiate Decap CMS OAuth handshake
    if (window.opener) {
      window.opener.postMessage("authorizing:github", "*");
      // Fallback in case opener does not respond to handshake
      setTimeout(function () {
        const content = ${JSON.stringify(content)};
        window.opener.postMessage(content, "*");
        window.close();
      }, 1000);
    } else {
      console.error("Decap CMS: No window.opener found.");
    }
  })();
</script>
<p>Authentication ${status === "success" ? "successful" : "failed"}. Completing login…</p>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
