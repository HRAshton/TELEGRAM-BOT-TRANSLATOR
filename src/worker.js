import { handle } from "./translator.js";

const validateAndParseRequestAsync = async (request, env) => {
  if (!request.url.includes(env.SECRET_KEY)) {
    console.error("Invalid secret key. URL: " + request.url);
    throw new Error("Invalid request");
  }

  if (request.method !== "POST") {
    console.error("Invalid request method: " + request.method);
    throw new Error("Invalid request");
  }

  let payload;
  try {
    payload = await request.json();
  } catch (err) {
    console.error(err);
    throw new Error("Invalid request");
  }

  if (!payload || !payload.message || !payload.message.text) {
    console.error("Invalid payload.");
    throw new Error("Invalid request");
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  if (!from || !to) {
    console.error("Invalid params. URL: " + request.url);
    throw new Error("Invalid request");
  }

  return { payload, from, to };
}

export default {
  async fetch(request, env, ctx) {
    let options;
    try {
      options = await validateAndParseRequestAsync(request, env);
    }
    catch (err) {
      return new Response(err.message, { status: 400 });
    }

    const { payload, from, to } = options;
    await handle(payload, from, to, env.TGLR_API_KEY);

    return new Response("OK", { status: 200 });
  },
};