import { askGroq } from "./providers/groq.js";

// لتغيير المزود لاحقاً غيّر هذه القيمة فقط
const PROVIDER = "groq";

export async function askLLM(env, prompt) {
  if (PROVIDER === "groq") return askGroq(env, prompt);
  throw new Error("مزود غير معروف: " + PROVIDER);
}
