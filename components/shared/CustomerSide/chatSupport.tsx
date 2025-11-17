"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatSupport() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "support", text: "Hello! How can we assist you today? 😊" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // Simulated bot reply (optional)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "support", text: "Thanks for your message! We'll get back to you shortly." },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-18 right-6 z-50 bg-[#3D6656] hover:bg-[#2F5245] text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all"
      >
        <MessageCircle size={26} />
      </button>

      {/* Chat Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex flex-col w-[350px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-lg font-bold">Chat Support</SheetTitle>
          </SheetHeader>

          <div className="flex-1 mt-4">
            <ScrollArea className="h-[70vh] pr-3">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-xl max-w-[75%] text-sm ${
                        msg.sender === "user"
                          ? "bg-[#3D6656] text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Send Message Input */}
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} className="bg-[#3D6656] hover:bg-[#2F5245]">
              Send
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
