import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import socketService from "@/services/Socketservice";

interface DiscussionMessage {
  id?: string | number;
  message_text?: string;
  message?: string;
  sender?: string;
  senderName?: string;
  created_at?: string;
  createdAt?: string;
  [key: string]: any;
}

interface DiscussionProps {
  courseId: string;
  moduleId: string;
  unitId: string;
  academicYear: string;
  semester: string;
  initialMessages?: DiscussionMessage[];
}

const Discussion = ({
  courseId,
  academicYear,
  semester,
  initialMessages = [],
}: DiscussionProps) => {
  const [messages, setMessages] = useState<DiscussionMessage[]>(initialMessages);
  const [messageInput, setMessageInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    const handleNewMessage = (message: DiscussionMessage) => {
      if (
        !message ||
        (message.courseId && String(message.courseId) !== String(courseId)) ||
        (message.course_id && String(message.course_id) !== String(courseId))
      ) {
        return;
      }

      setMessages((prev) => [...prev, message]);
    };

    socketService.onNewMessage(handleNewMessage);
    return () => {
      socketService.offNewMessage(handleNewMessage);
    };
  }, [courseId]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const generateMessageId = () =>
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const formattedMessages = useMemo(
    () =>
      messages.map((msg) => ({
        id: msg.id || generateMessageId(),
        body: msg.message_text || msg.message || "",
        sender: msg.sender || msg.senderName || "Unknown",
        createdAt: msg.created_at || msg.createdAt || new Date().toISOString(),
      })),
    [messages]
  );

  const handleSend = async () => {
    const content = messageInput.trim();
    if (!content) return;

    setIsSending(true);
    try {
      socketService.postMessage(
        {
          courseId: Number(courseId),
          academicYear,
          semester,
          message_text: content,
        },
        (response) => {
          if (!response?.ok) {
            console.error("Failed to send message:", response?.error);
          }
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          message_text: content,
          sender: "You",
          created_at: new Date().toISOString(),
          courseId,
        },
      ]);
      setMessageInput("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto space-y-3 p-4 bg-muted/30"
      >
        {formattedMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : (
          formattedMessages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-lg bg-background p-3 shadow-sm border"
            >
              <div className="text-sm font-semibold">{msg.sender}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {msg.body}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t p-4 space-y-2 bg-card">
        <Textarea
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
          placeholder="Write a message..."
          rows={3}
        />
        <div className="flex justify-end">
          <Button onClick={handleSend} disabled={isSending || !messageInput.trim()}>
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Discussion;

