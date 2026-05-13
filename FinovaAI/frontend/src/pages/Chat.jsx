import { useState } from "react";
import Layout from "../components/Layout";
import { sendMessage } from "../services/Api";
import "../styles/chat.css";

export default function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // const res = await sendMessage({
      //   message: input,
      //   history: messages,
        
      // });
      const userId = localStorage.getItem("userId");

const res = await sendMessage({
  message: input,
  history: messages,
  userId,
});
    
      const aiMessage = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages([...newMessages, aiMessage]);

    } catch (err) {
      console.error(err);
      alert("AI error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-[85vh] max-w-4xl mx-auto p-4">

        <h1 className="text-2xl font-bold mb-4">AI Financial Assistant</h1>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow mb-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={` p-2 rounded max-w-[75%] ${
                msg.role === "user"
                  ? "chat-back bg-blue-500 text-white ml-auto"
                  // : "bg-gray-200 text-black"
                  : "chat-background bg-white text-black border"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && <p className="text-gray-500">AI is typing...</p>}
        </div>

        {/* INPUT */}
        <div className="chat-button flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your finances..."
            className="chat-input flex-1 border p-2 rounded"
          />

          <button
            onClick={handleSend}
            className="chat-buttons bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>

      </div>
    </Layout>
  );
}