import { useState } from "react";

const AssistantWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-3xl shadow-xl hover:scale-110 transition"
      >
        🤖
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[90vw] rounded-2xl bg-white shadow-2xl border overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-4">

            <h2 className="font-bold text-lg">
              CivicAI Assistant
            </h2>

            <p className="text-blue-100 text-sm">
              Ask anything about civic issues
            </p>

          </div>

          {/* Messages */}
          <div className="h-80 p-4 overflow-y-auto bg-slate-50">

            <div className="bg-blue-100 rounded-xl p-3 w-fit max-w-full">
              👋 Hello! I'm your CivicAI Assistant.
            </div>

          </div>

          {/* Input */}
          <div className="border-t p-3">

            <div className="flex gap-2">

              <input
                type="text"
                placeholder="Describe your issue..."
                className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                className="bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-700"
              >
                Send
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default AssistantWidget;