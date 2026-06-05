export async function chatWithIfteakarBot({ data }: { data: { messages: any[] } }) {
  try {
    const response = await fetch("http://localhost:8083/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: data.messages }),
    });

    if (!response.ok) {
      throw new Error("Backend server error");
    }

    return await response.json();
  } catch (error) {
    console.error("ChatBot API Error:", error);
    return { 
      reply: "", 
      error: "AI service is currently unavailable. Please ensure backend is running." 
    };
  }
}