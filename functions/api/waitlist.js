const DESTINATION = "y1engineeringllc@gmail.com";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function onRequestPost({ request }) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }

  if (payload && payload.company) {
    return json({ ok: true });
  }

  const email = String((payload && payload.email) || "")
    .trim()
    .toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return json({ ok: false }, 400);
  }

  const origin = request.headers.get("Origin") || "https://sabaireplay.app";
  let upstream;
  try {
    upstream = await fetch(
      "https://formsubmit.co/ajax/" + encodeURIComponent(DESTINATION),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: request.headers.get("Referer") || origin + "/",
        },
        body: JSON.stringify({
          email,
          _subject: "Sabai Replay waitlist",
          _captcha: "false",
          _template: "box",
        }),
      }
    );
  } catch {
    return json({ ok: false }, 502);
  }

  const data = await upstream.json().catch(() => ({}));
  const message = String(data.message || "");
  const accepted =
    data.success === true ||
    data.success === "true" ||
    /needs activation/i.test(message);
  if (!upstream.ok || !accepted) {
    return json({ ok: false }, 502);
  }
  return json({ ok: true });
}
