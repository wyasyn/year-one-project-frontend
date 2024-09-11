"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import logo from "@/assets/logo.png";
import darkLogo from "@/assets/darkLogo.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { sampleQuestions } from "@/constants/data";
const apiUri = process.env.NEXT_PUBLIC_URI;

// Define the type for each chat message
interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const StudentChat: React.FC = () => {
  const [message, setMessage] = useState<string>(""); // Type for message is string
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // Array of ChatMessage type
  const chatEndRef = useRef<HTMLDivElement | null>(null); // Reference for the chat end div
  const [loading, setLoading] = useState(false);

  // Handle form submission and message sending
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Add user's message to chat history
    setChatHistory((prevChat) => [
      ...prevChat,
      { sender: "user", text: message },
    ]);

    try {
      setLoading(true); // Show loading spinner before sending request
      // Send the message to the Flask API
      const res = await axios.post(`${apiUri}/predict`, {
        message,
      });

      // Add the bot's response to the chat history
      setChatHistory((prevChat) => [
        ...prevChat,
        { sender: "bot", text: res.data.answer },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory((prevChat) => [
        ...prevChat,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false); // Hide loading spinner after request finishes
      setMessage(""); // Clear input after sending
    }
  };

  // Auto-scroll to the bottom of the chat history
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);
  const { theme } = useTheme();

  return (
    <div className="flex flex-col max-w-lg mx-auto w-full">
      {chatHistory.length === 0 ? (
        <div className="flex items-center flex-col gap-12 mt-[5rem]">
          <Image src={logo} alt="logo" width={100} height={100} />
          <div className=" grid gap-4 grid-cols-2 p-3 md:p-0">
            {sampleQuestions.map((question) => (
              <div
                key={question.id}
                className="border p-3 rounded-xl flex flex-col gap-3 cursor-pointer"
                onClick={() => {
                  setMessage(question.question);
                }}
              >
                <p>{question.emoji}</p>
                <p>{question.question}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-grow space-y-5 p-3 overflow-y-auto mb-[5rem] ">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={` flex gap-3 ${
                chat.sender === "user"
                  ? "justify-end text-foreground"
                  : "justify-start"
              } `}
            >
              {chat.sender === "bot" && (
                <div>
                  <Image
                    src={theme === "light" ? logo : darkLogo}
                    alt="logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              )}

              <p
                className={` p-3 rounded-lg w-max max-w-xs ${
                  chat.sender === "user" ? " bg-secondary/50" : ""
                }`}
              >
                {chat.text}
              </p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      )}

      <form
        className="flex backdrop-blur-sm py-2 px-3 border bg-secondary/50 rounded-full gap-2 fixed bottom-8 left-1/2 -translate-x-1/2 max-w-lg focus-within:border-accent w-[95%] z-50  "
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=" outline-none border-none bg-transparent"
          placeholder="Type inquiry here..."
          required
        />
        <Button
          type="submit"
          size={"sm"}
          disabled={message.length === 0 || loading}
        >
          <SendHorizontal size={20} />
        </Button>
      </form>
      <small className="fixed bottom-0 left-0 right-0 p-2 flex items-center justify-center w-full text-center text-balance bg-background z-10">
        CampusBot can make mistakes. Please check important info.
      </small>
    </div>
  );
};

export default StudentChat;
