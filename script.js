document.getElementById("sendButton").addEventListener("click", async () => {
  const personality = document.getElementById("personality").value;
  const userMessage = document.getElementById("userMessage").value;
  const chat = document.getElementById("chat");

  if (!personality || !userMessage) {
    alert("Please provide both personality and message.");
    return;
  }

  // 表示用: ユーザーのメッセージを追加
  const userDiv = document.createElement("div");
  userDiv.classList.add("message", "user");
  userDiv.textContent = `You: ${userMessage}`;
  chat.appendChild(userDiv);

  // OpenAI API リクエスト
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`, // APIキーをここに挿入
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: personality },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    // 表示用: AIのメッセージを追加
    const aiDiv = document.createElement("div");
    aiDiv.classList.add("message", "ai");
    aiDiv.textContent = `AI: ${aiMessage}`;
    chat.appendChild(aiDiv);

    // テキストボックスをクリア
    document.getElementById("userMessage").value = "";
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to connect to AI. Check your API key and network.");
  }
});
