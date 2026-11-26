import { askLLM } from "./llm.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const prompt = url.searchParams.get("q");

    if (!prompt) {
      return new Response("أرسل سؤالك هكذا: ?q=مرحبا", { status: 400 });
    }

    try {
      const answer = await askLLM(env, prompt);
      return new Response(answer);
    } catch (err) {
      return new Response("خطأ: " + err.message, { status: 500 });
    }
  },
};
