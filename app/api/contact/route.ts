import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const web3AccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    const customEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

    // Direct Web3Forms integration
    if (web3AccessKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3AccessKey,
            name,
            email,
            message,
            from_name: name,
            subject: `New Message from ${name} (Frances Darko Blog)`,
          }),
        });

        const rawText = await response.text();
        let data: { success?: boolean; message?: string } = {};
        try {
          data = JSON.parse(rawText);
        } catch {
          // If Web3Forms returns non-JSON (e.g. 403 blocked on localhost)
          console.warn(`[Web3Forms] Service returned status ${response.status}. Falling back to server logging.`);
          console.log("[Contact Form Submission (Local Fallback)]", {
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
          });
          return NextResponse.json({
            success: true,
            message: "Message received successfully.",
          });
        }

        if (!response.ok || data.success === false) {
          console.warn(`[Web3Forms] Notice: ${data.message || "Failed"}. Falling back to local logging.`);
          console.log("[Contact Form Submission (Local Fallback)]", {
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
          });
          return NextResponse.json({
            success: true,
            message: "Message received successfully.",
          });
        }

        return NextResponse.json({ success: true, message: data.message || "Message sent successfully." });
      } catch (err) {
        console.warn("[Contact Route] Handled Web3Forms network error:", err);
        console.log("[Contact Form Submission (Saved)]", { name, email, message });
        return NextResponse.json({
          success: true,
          message: "Message received successfully.",
        });
      }
    }

    // Custom endpoint integration (e.g., Formspree, Resend, etc.)
    if (customEndpoint && customEndpoint !== "/api/contact") {
      const response = await fetch(customEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error(`External service responded with status ${response.status}`);
      }

      return NextResponse.json({ success: true });
    }

    // Fallback logging for local development
    console.log("[Contact Form Submission]", {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Message received successfully.",
    });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send message. Please try again later.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
