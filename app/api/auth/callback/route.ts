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
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Authenticating — Frances Darko</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #faf8f5;
      color: #2b2927;
      text-align: center;
      padding: 20px;
      box-sizing: border-box;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      max-width: 400px;
      width: 100%;
    }
    .status {
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .desc {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 1.5rem;
    }
    .btn {
      display: inline-block;
      background: #2b2927;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.9rem;
      cursor: pointer;
      border: none;
    }
    .btn:hover {
      background: #444;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="status">${status === "success" ? "✓ Logged in successfully!" : "✕ Authentication failed"}</div>
    <div class="desc">${status === "success" ? "Connecting to Decap CMS… This window should close automatically." : (payload.message || "An error occurred.")}</div>
    <button class="btn" onclick="tryClose()">Close window</button>
  </div>

<script>
  (function () {
    const content = ${JSON.stringify(content)};
    
    function send() {
      if (window.opener) {
        window.opener.postMessage(content, "*");
        window.opener.postMessage("authorizing:github", "*");
      }
    }

    function receiveMessage(e) {
      if (e.data === "authorizing:github" && window.opener) {
        window.opener.postMessage(content, e.origin);
        setTimeout(tryClose, 300);
      }
    }

    window.addEventListener("message", receiveMessage, false);

    // Send immediately and repeat every 200ms
    send();
    const timer = setInterval(send, 200);

    // Stop after 3 seconds and attempt to close
    setTimeout(function () {
      clearInterval(timer);
      tryClose();
    }, 2500);
  })();

  function tryClose() {
    try {
      window.close();
    } catch (e) {}
  }
</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { 
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
