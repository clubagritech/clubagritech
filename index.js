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

    if (!prompt) {
      return new Response("أرسل سؤالك هكذا: ?q=مرحبا", { status: 400, headers: CORS });
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
