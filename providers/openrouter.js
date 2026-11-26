export async function askOpenRouter(env, prompt) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.API_Key_openrouter}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${detail}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
