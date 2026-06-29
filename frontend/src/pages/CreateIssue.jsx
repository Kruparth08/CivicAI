import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const CreateIssue = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  });

  const [messages, setMessages] = useState([
    { sender: "ai", text: "👋 Hi! I'm CivicAI Assistant. I'll help you report your issue." },
    { sender: "ai", text: "Please describe the problem you're facing." },
  ]);

  const [chatInput, setChatInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = async () => {
    const currentMessage = chatInput.trim();
    if (!currentMessage || chatLoading) return;

    const nextMessages = [...messages, { sender: "user", text: currentMessage }];
    setMessages(nextMessages);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await axiosInstance.post("/ai/agent", {
        message: currentMessage,
        history: nextMessages,
      });

      const aiData = response?.data?.data || {};

      // Fill form when AI has enough info
      if (aiData.action === "CREATE_ISSUE" && aiData.title) {
        setFormData({
          title: aiData.title || "",
          description: aiData.description || "",
          location: aiData.location || "",
        });
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "✅ I've filled the form with your issue details. Please review, add an image if needed, and click Submit Issue." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: aiData.reply || "I can help you report this issue." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: error.response?.data?.message || "Sorry, I couldn't reach the assistant right now." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
    alert("Please upload an image of the issue.");
    return;
  }
    try {
      setLoading(true);
      const issueData = new FormData();
      issueData.append("title", formData.title);
      issueData.append("description", formData.description);
      issueData.append("location", formData.location);
      if (image) issueData.append("image", image);

      await axiosInstance.post("/issues", issueData);
      alert("Issue Reported Successfully");
      setFormData({ title: "", description: "", location: "" });
      setImage(null);
      document.querySelector('input[type="file"]').value = "";
      navigate("/my-issues");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 sm:p-8 text-white mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold">Report a Civic Issue</h1>
          <p className="mt-3 text-blue-100 text-sm sm:text-lg">
            Use the AI assistant to describe your issue — it will fill the form for you. Then click Submit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Example: Road Damage near City Mall"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the issue in detail..."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter issue location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              {/* Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Image </label>
                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-14 sm:h-14 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 7.5L12 3m0 0L7.5 7.5M12 3v12" />
                  </svg>
                  <p className="font-medium text-gray-700">Click to upload an image</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG or JPEG (Max 5MB)</p>
                  {image && (
                    <div className="mt-5 flex flex-col items-center">
                      <img src={URL.createObjectURL(image)} alt="Preview" required className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-xl border shadow" />
                      <p className="mt-3 text-green-600 font-semibold text-sm text-center break-all">{image.name}</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
                        alert("Only PNG, JPG and JPEG images are allowed.");
                        return;
                      }
                      if (file.size > 5 * 1024 * 1024) {
                        alert("Image size must be less than 5MB.");
                        return;
                      }
                      setImage(file);
                    }}
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:bg-gray-400"
                >
                  {loading ? "Submitting..." : "Submit Issue"}
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>

          {/* Desktop AI Assistant */}
          <div className="hidden lg:flex bg-white rounded-2xl shadow-lg flex-col h-[700px]">
            <div className="bg-blue-600 text-white p-5 rounded-t-2xl">
              <h2 className="text-xl font-bold">🤖 CivicAI Assistant</h2>
              <p className="text-blue-100 text-sm mt-1">Describe your issue — I'll fill the form for you.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-xl ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-4 py-2 outline-none"
                  onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                />
                <button
                  onClick={sendMessage}
                  disabled={chatLoading || !chatInput.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg disabled:bg-gray-400"
                >
                  {chatLoading ? "..." : "Send"}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Floating AI Button (Mobile Only) */}
        <button
          type="button"
          onClick={() => setShowChat(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center text-3xl hover:scale-105 active:scale-95 transition"
        >
          🤖
        </button>

        {/* Mobile AI Chat */}
        {showChat && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowChat(false)}></div>
            <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col animate-slide-up">
              <div className="bg-blue-600 text-white rounded-t-3xl p-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">🤖 CivicAI Assistant</h2>
                  <p className="text-sm text-blue-100">Describe your issue — I'll fill the form.</p>
                </div>
                <button onClick={() => setShowChat(false)} className="text-3xl leading-none">×</button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-xl px-4 py-3 break-words ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                  />
                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={chatLoading || !chatInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg disabled:bg-gray-400"
                  >
                    {chatLoading ? "..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CreateIssue;
