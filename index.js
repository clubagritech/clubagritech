import { askLLM } from "./llm.js";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const prompt = (url.searchParams.get("q") || "").slice(0, 500);

    // بدون q: قدّم صفحة الدردشة
    if (!prompt) {
      return env.ASSETS.fetch(request);
    }

    try {
      const answer = await askLLM(env, prompt);
      return new Response(answer, {
        headers: { ...CORS, "Content-Type": "text/plain; charset=utf-8" },
      });
    } catch (err) {
      return new Response("خطأ: " + err.message, { status: 500, headers: CORS });
    }
  },
};
