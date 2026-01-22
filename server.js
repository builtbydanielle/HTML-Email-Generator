// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ---------------- template ----------------
function defaultTemplate({
  subject = "Your update",
  logoUrl = "https://i.ibb.co/hRJBLbp/R.png",
  company = "Your Company",
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${escapeHtml(subject)}</title>
  <style>
    html, body { margin:0; padding:0; height:100%; width:100%; }
    body { background:#f4f6f8; font-family:Segoe UI, Segoe, Roboto, Helvetica, Arial, sans-serif; }
    .wrapper { width:100%; }
    .container { max-width:600px; margin:0 auto; background:#ffffff; }
    .p-hero { padding:24px 28px 0 28px; }
    .p-body { padding:16px 28px 28px 28px; line-height:1.55; color:#1f2937; }
    .p-footer { padding:20px 28px 40px 28px; font-size:12px; color:#6b7280; }
    .logo { text-align:center; padding:24px 0 8px 0; }
    .logo img { max-width:220px; height:auto; display:block; margin:0 auto; }
    @media (prefers-color-scheme: dark) {
      body { background:#0b0e11; }
      .container { background:#0f1318; }
      .p-body { color:#e5e7eb; }
      .p-footer { color:#9ca3af; }
    }
  </style>
</head>
<body bgcolor="#f4f6f8">
  <div class="wrapper">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f4f6f8">
      <tr>
        <td align="center">
          <!-- Responsive container -->
          <table role="presentation" class="container" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width:600px; margin:0 auto;">
            <!-- Logo -->
            <tr>
              <td class="logo" align="center" style="padding:24px 0 8px 0;">
                <img src="${escapeAttr(logoUrl)}" alt="${escapeAttr(company)} logo">
              </td>
            </tr>

            <!-- Subject line as H1 -->
            <tr>
              <td class="p-hero" style="padding:24px 28px 0 28px;">
                <h1 style="margin:0; font-size:22px; line-height:1.3; color:#3d7cc9;">
                  ${escapeHtml(subject)}
                </h1>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:16px 28px 0 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr><td height="1" style="font-size:0; line-height:0; background:#e5e7eb;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>

            <!-- Email body (AI inserts here) -->
            <tr>
              <td class="p-body" style="padding:16px 28px 28px 28px; line-height:1.55; color:#1f2937;">
                <!-- EMAIL START -->
                {{BODY_HTML}}
                <!-- EMAIL END -->
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="p-footer dm-card dm-text" align="center" style="padding:30px 20px 20px; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:20px; color:#333;">
                <img
                  src="${escapeAttr(logoUrl)}"
                  width="160" alt="${escapeAttr(company)}" style="margin:0 auto 10px; display:block;">
                <p class="dm-muted" style="font-size:12px; color:#555; margin:10px 0 0;">© 2025 ${escapeAttr(company)}</p>
                <p class="dm-muted" style="font-size:10px; color:#555; padding:20px; text-align:left; line-height:16px;">
                  The information contained in this e-mail transmission is intended for the use of the individual to whom it is addressed and may contain information which is privileged, confidential, and exempt from disclosure by applicable law. If you are not the intended recipient, please notify us and delete the original message.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}

// ---------------- Helpers ----------------
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function escapeAttr(str = "") {
  return escapeHtml(str).replace(/'/g, "&#39;");
}

function buildPrompt({ audience, goal, tone, keyPoints, company, sender, cta, extra, brandVoice }) {
  const bulletPoints = Array.isArray(keyPoints) && keyPoints.length
    ? keyPoints.map((k, i) => `${i + 1}. ${k}`).join("\n")
    : "None provided";

  const usePhrases = (brandVoice?.use || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  const avoidPhrases = (brandVoice?.avoid || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  return `
You are writing a clear, professional, LETTER-STYLE email body that will be dropped into an existing HTML template.
Return ONLY an HTML FRAGMENT for the body section. Do not include <html>, <head>, or <body>.

Allowed tags: <p>, <ul>, <li>, <strong>, <em>, <a>. No others.
No inline styles, no images, no tables, no emojis, no em dashes.

Audience: ${audience || "general business recipients"}
Company: ${company || "Your Company"}
Sender signature (plain text at end): ${sender || "Team"}
Goal: ${goal || "inform and guide"}
Tone: ${tone || "clear, friendly, professional"}

Key points to cover as short paragraphs or a tight list:
${bulletPoints}

⚠️ CRITICAL: If the key points include specific dates, times, or deadlines, you MUST include them prominently in the email. Never invent or omit dates.

Brand voice guidance:
- Prefer these phrases (use naturally, only if they fit): ${usePhrases.length ? usePhrases.map(p => `"${p}"`).join(", ") : "none"}
- Avoid these phrases entirely: ${avoidPhrases.length ? avoidPhrases.map(p => `"${p}"`).join(", ") : "none"}

If a CTA is provided, include ONE short sentence with ONE <a> link that uses neutral, action-oriented text.
CTA: ${cta?.label ? `Label: "${cta.label}" | URL: ${cta.url || "#"}` : "None"}

Structure:
<p>Greeting tied to the audience/context.</p>
<p>1–2 concise paragraphs that explain the why and what.</p>
<ul><li>Bite-size details or next steps (INCLUDE ANY DATES/TIMES from key points)</li></ul>
${cta?.label ? `<p>One sentence with a single <a href="${cta.url || "#"}">${cta.label}</a>.</p>` : ""}
<p>Short closing sentence.</p>
<p>${sender || "Team"}</p>

Important:
- Aim for 150–220 words.
- Simple, concrete sentences. No hype or promises.
- Use only information provided. Do not invent dates or claims.
- If dates/times are mentioned in key points, include them verbatim with <strong> tags for emphasis.
- Do not mention templates, headers, logos, or unsubscribe links.

Additional guidance from the user:
${extra || "None"}
`.trim();
}

// ---- Gemini call ----
// use the current stable 2.5 Flash-Lite text model on the v1 API
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1";
const GEMINI_MODEL = "models/gemini-2.5-flash-lite"; // or "models/gemini-2.5-flash"


async function generateWithGemini(prompt) {
  const key = process.env.GEMINI_API_KEY || "";
  if (!key) throw new Error("Missing GEMINI_API_KEY in .env");

  const url = `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`;

  const delays = [300, 600, 900]; // ms
  let lastErr = null;

  for (let i = 0; i < delays.length; i++) {
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }]}],
        }),
      });

      if (!resp.ok) {
        const body = await resp.text();

        // If the model is overloaded, bubble a clean error up to the UI
        if (resp.status === 503) {
          throw new Error("Gemini says: model overloaded (503). Try a lighter model or retry later.");
        }

        throw new Error(`Gemini HTTP ${resp.status}: ${body}`);
      }

      const data = await resp.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];
      const text = parts.map(p => p.text || "").join("").trim();
      if (text) return text;

      lastErr = new Error("Empty response text from Gemini");
      await new Promise(r => setTimeout(r, delays[i]));
    } catch (e) {
      lastErr = e;
      await new Promise(r => setTimeout(r, delays[i]));
    }
  }

  throw lastErr || new Error("Gemini failed after retries");
}

// ------------- guardrails: sanitize & clamp -------------
function sanitizeFragment(html) {
  if (!html) return "";
  let s = String(html).replace(/\u2014/g, "-");

  s = s.replace(/\r\n?/g, "\n");

  const allowed = new Set(["p","ul","li","strong","em","a"]);
  s = s.replace(/<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g, (m, tag, attrs) => {
    const t = String(tag || "").toLowerCase();
    if (!allowed.has(t)) {
      return "";
    }
    if (t === "a") {
      return m;
    }
    return m.replace(/\s[^>]*>/, ">");
  });

  let linkCount = 0;
  s = s
    .replace(/<a\b([^>]*)>/gi, (m, attrs) => {
      if (linkCount >= 1) {
        return "";
      }
      const hrefMatch = String(attrs).match(/\bhref\s*=\s*"(.*?)"/i) || String(attrs).match(/\bhref\s*=\s*'(.*?)'/i);
      let href = hrefMatch ? hrefMatch[1] : "#";
      if (href.startsWith("http://")) href = "https://" + href.slice(7);
      if (!/^https?:\/\//i.test(href)) href = "https://"+href.replace(/^\/+/, "");
      linkCount += 1;
      return `<a href="${escapeAttr(href)}">`;
    })
    .replace(/<\/a>/gi, (m) => {
      if (linkCount > 0) return "</a>";
      return "";
    });

  s = s.replace(/<(p|ul|li|strong|em)\b[^>]*>/gi, "<$1>");

  const textOnly = s.replace(/<\/?[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = textOnly.split(" ").filter(Boolean);
  const MAX = 220;
  if (words.length > MAX) {
    const clipped = words.slice(0, MAX).join(" ");
    s = `<p>${escapeHtml(clipped)}</p>`;
  }

  s = s.replace(/<script[\s\S]*?<\/script>/gi, "")
       .replace(/<style[\s\S]*?<\/style>/gi, "");

  return s.trim();
}

// ---------------- route ----------------
app.post("/api/generate", async (req, res) => {
  try {
    const {
      subject = "Important update",
      audience = "",
      goal = "",
      tone = "friendly, professional",
      keyPoints = [],
      brand = {},
      sender = "The Team",
      cta = null,
      extra = "",
      brandVoice = {},
      baseTemplateHtml = null,
    } = req.body || {};

    console.log("Incoming generate request, subject:", subject);

    const prompt = buildPrompt({
      audience,
      goal,
      tone,
      keyPoints,
      company: brand.company || "Your Company",
      sender,
      cta,
      extra,
      brandVoice, 
    });

    const rawFragment = await generateWithGemini(prompt);
    const bodyFragment = sanitizeFragment(rawFragment);

    const template = baseTemplateHtml
      ? String(baseTemplateHtml)
      : defaultTemplate({
          subject,
          logoUrl: brand.logoUrl || "https://i.ibb.co/hRJBLbp/R.png",
          company: brand.company || "Your Company",
        });

    const finalHtml = template.replace("{{BODY_HTML}}", bodyFragment || "<p>(No content returned)</p>");

    res.json({ ok: true, subject, html: finalHtml, rawBodyFragment: rawFragment, sanitized: bodyFragment });
  } catch (err) {
    console.error("Generation error:", err);
    res.json({
      ok: false,
      error: String(err.message || "Generation failed"),
    });
  }
});

// ---------------- server ----------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);
});
