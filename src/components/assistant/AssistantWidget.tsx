"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAssistantReply, type AssistantLink } from "@/lib/assistant";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  links?: AssistantLink[];
}

const WELCOME_MESSAGE: Message = {
  id: 0,
  role: "assistant",
  text: "Hi, I'm the Wanderlouge assistant. Ask me about a destination, the blog, or how to get in touch.",
};

const SUGGESTIONS = ["Tell me about Goa", "Where has Darshan travelled?", "How do I get in touch?"];

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = { id: nextId.current++, role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const reply = getAssistantReply(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", text: reply.text, links: reply.links },
      ]);
      setIsTyping(false);
    }, 450);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="assistant-panel"
        aria-label={open ? "Close assistant" : "Open Wanderlouge assistant"}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-white-warm shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-terracotta-dark"
      >
        {open ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div
        id="assistant-panel"
        className={cn(
          "fixed bottom-24 right-6 z-40 flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden border border-forest/10 bg-white-warm shadow-2xl transition-all duration-300",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
        style={{ height: "min(28rem, 70vh)" }}
      >
        <div className="flex items-center justify-between border-b border-forest/10 bg-forest px-5 py-4">
          <div>
            <p className="font-serif text-lg text-white-warm">Wanderlouge Assistant</p>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-gold">Ask about the journey</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] px-4 py-2.5 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-terracotta text-white-warm"
                    : "border border-forest/10 bg-cream/50 text-forest",
                )}
              >
                <p>{message.text}</p>
                {message.links && message.links.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.links.map((link) => (
                      <Link
                        key={link.href + link.label}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1 border border-forest/20 bg-white-warm px-2.5 py-1 text-xs font-medium text-forest transition-colors hover:border-terracotta hover:text-terracotta"
                      >
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="border border-forest/10 bg-cream/50 px-4 py-2.5 text-sm text-forest/50">
                Typing…
              </div>
            </div>
          )}

          {messages.length === 1 && !isTyping && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="border border-forest/15 px-3 py-1.5 text-xs text-forest/70 transition-colors hover:border-terracotta hover:text-terracotta"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2 border-t border-forest/10 px-3 py-3"
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask a question…"
            aria-label="Message the Wanderlouge assistant"
            className="w-full bg-transparent px-2 font-sans text-sm text-forest placeholder:text-forest/40 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim()}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-terracotta text-white-warm transition-colors hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 12h16M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
