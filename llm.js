import { askGroq } from "./providers/groq.js";
import { askGemini } from "./providers/gemini.js";
import { askOpenRouter } from "./providers/openrouter.js";
import { SYSTEM_PROMPT } from "./prompts/system.js";
import { buildRules } from "./prompts/rules.js";

// ترتيب المزودين: الأول هو الأساسي، والباقي احتياطي
const PROVIDERS = [
  { name: "groq", ask: askGroq },
  { name: "gemini", ask: askGemini },
  { name: "openrouter", ask: askOpenRouter },
];

// التعليمات النهائية التي تُرسل مع كل طلب
const SYSTEM = `${SYSTEM_PROMPT.trim()}\n\nالقواعد:\n${buildRules()}`;

export async function askLLM(env, prompt) {
  const errors = [];

  for (const provider of PROVIDERS) {
    try {
      return await provider.ask(env, prompt, SYSTEM);
    } catch (err) {
      errors.push(`${provider.name}: ${err.message}`);
    }
  }

  throw new Error("كل المزودين فشلوا => " + errors.join(" | "));
}
