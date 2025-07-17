// Chatbot toggle
const botToggle = document.getElementById("chatbot-toggle");
const botWindow = document.getElementById("chatbot");

botToggle.addEventListener("click", () => {
  botWindow.classList.toggle("open");
});

// Outside click to close
window.addEventListener("click", (e) => {
  if (!botWindow.contains(e.target) && e.target !== botToggle) {
    botWindow.classList.remove("open");
  }
});

// Simple chatbot responses
const botForm = document.getElementById("chatbot-form");
const botInput = document.getElementById("chatbot-input");
const botMessages = document.getElementById("chatbot-messages");

botForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMsg = botInput.value.trim();
  if (userMsg === "") return;

  appendMessage("Siz", userMsg);
  botInput.value = "";

  let reply = "Kechirasiz, bu savolga hali tayyor emasman.";
  if (userMsg.toLowerCase().includes("match")) {
    reply = "Keyingi match yakshanba kuni soat 20:00 da!";
  } else if (userMsg.toLowerCase().includes("igl")) {
    reply = "Bizning IGL — Sardor VIBE X.";
  } else if (userMsg.toLowerCase().includes("instagram")) {
    reply = "Instagram: @stellar.edition";
  } else if (userMsg.toLowerCase().includes("telegram")) {
    reply = "Telegram: @legendjonnn";
  }

  setTimeout(() => appendMessage("Bot", reply), 600);
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("chat-message");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  botMessages.appendChild(msg);
  botMessages.scrollTop = botMessages.scrollHeight;
}
chatbotToggle.classList.add("chatbot-toggle");
chatbotToggle.innerText = "Chatbot";