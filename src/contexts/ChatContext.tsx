import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  setDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Types 
export type ChatUser = {
  id: string;
  name: string;
  color: string;
};

export type ChatMessage = {
  id: string;
  text: string;
  username: string;
  userId: string;
  color: string;
  timestamp: Date | null;
  readBy: string[];
};

export type TypingState = {
  userId: string;
  name: string;
};

type ChatContextType = {
  currentUserId: string;
  username: string;
  color: string;
  users: ChatUser[];
  messages: ChatMessage[];
  typingUsers: TypingState[];
  updateUsername: (newName: string) => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
  setTyping: (isTyping: boolean) => void;
};

// Context 
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Local storage 
const USER_ID_KEY = "chat_user_id";
const USERNAME_KEY = "chat_username";
const USER_COLOR_KEY = "chat_user_color";

const isBrowser = typeof window !== "undefined";

// Helpers 
function generateRandomColor(): string {
  const colors = [
    "#22c55e",
    "#3b82f6",
    "#eab308",
    "#ec4899",
    "#8b5cf6",
    "#f97316",
    "#ef4444",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateGuestName(): string {
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `Guest-${rnd}`;
}

function getInitialUserId(): string {
  if (!isBrowser) return "";
  const existing = window.localStorage.getItem(USER_ID_KEY);
  if (existing) return existing;

  const id = crypto.randomUUID();
  window.localStorage.setItem(USER_ID_KEY, id);
  return id;
}

function getInitialUsername(): string {
  if (!isBrowser) return "";
  const existing = window.localStorage.getItem(USERNAME_KEY);
  if (existing) return existing;

  const name = generateGuestName();
  window.localStorage.setItem(USERNAME_KEY, name);
  return name;
}

function getInitialColor(): string {
  if (!isBrowser) return "#22c55e";
  const existing = window.localStorage.getItem(USER_COLOR_KEY);
  if (existing) return existing;

  const color = generateRandomColor();
  window.localStorage.setItem(USER_COLOR_KEY, color);
  return color;
}

// Provider
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [currentUserId] = useState<string>(getInitialUserId);
  const [username, setUsername] = useState<string>(getInitialUsername);
  const [color] = useState<string>(getInitialColor);

  const [users, setUsers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingState[]>([]);

  // timeout ref for typing auto-clear
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Register presence
  useEffect(() => {
    if (!currentUserId || !username || !color) return;

    const presenceRef = doc(db, "presence", currentUserId);

    const register = async () => {
      await setDoc(
        presenceRef,
        {
          name: username,
          color,
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
    };

    void register();

    const handleUnload = () => {
      void deleteDoc(presenceRef).catch(() => {});
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      void deleteDoc(presenceRef).catch(() => {});
    };
  }, [currentUserId, username, color]);

  // Presence listener
  useEffect(() => {
    const col = collection(db, "presence");

    const unsub = onSnapshot(col, (snap) => {
      const list = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: data.name ?? "Unknown",
          color: data.color ?? "#777777",
        };
      });
      setUsers(list);
    });

    return () => unsub();
  }, []);

  // Messages listener
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

    const unsub = onSnapshot(q, (snap) => {
      const list: ChatMessage[] = snap.docs.map(
        (d: QueryDocumentSnapshot<DocumentData>) => {
          const data = d.data();
          return {
            id: d.id,
            text: data.text ?? "",
            username: data.username ?? "Unknown",
            userId: data.userId ?? "",
            color: data.color ?? "#777777",
            timestamp: data.timestamp?.toDate() ?? null,
            readBy: Array.isArray(data.readBy) ? data.readBy : [],
          };
        }
      );
      setMessages(list);

      // auto-mark all as read for current user
      list.forEach(async (msg) => {
        if (!msg.readBy.includes(currentUserId)) {
          const msgRef = doc(db, "messages", msg.id);
          await updateDoc(msgRef, {
            readBy: [...msg.readBy, currentUserId],
          });
        }
      });
    });

    return () => unsub();
  }, [currentUserId]);

  // Typing indicator listener
  useEffect(() => {
    const col = collection(db, "typing");

    const unsub = onSnapshot(col, (snap) => {
      const list: TypingState[] = snap.docs
        .map((d) => {
          const data = d.data();
          return {
            userId: d.id,
            name: data.name,
          };
        })
        .filter((t) => t.userId !== currentUserId);

      setTypingUsers(list);
    });

    return () => unsub();
  }, [currentUserId]);

  // Update typing state
  const setTyping = (isTyping: boolean) => {
    const typingRef = doc(db, "typing", currentUserId);

    if (isTyping) {
      setDoc(typingRef, {
        name: username,
        timestamp: serverTimestamp(),
      });

      // Clear any existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new auto-clear timeout
      typingTimeoutRef.current = setTimeout(() => {
        deleteDoc(typingRef).catch(() => {});
        typingTimeoutRef.current = null;
      }, 2500);
    } else {
      deleteDoc(typingRef).catch(() => {});
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }
  };

  // Update username
  const updateUsername = async (newName: string) => {
    const t = newName.trim();
    if (!t) return;

    setUsername(t);
    if (isBrowser) {
      window.localStorage.setItem(USERNAME_KEY, t);
    }

    await updateDoc(doc(db, "presence", currentUserId), {
      name: t,
    });
  };

  // Send message
  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    await addDoc(collection(db, "messages"), {
      text: trimmed,
      username,
      userId: currentUserId,
      color,
      timestamp: serverTimestamp(),
      readBy: [currentUserId],
    });

    // stop typing when message is sent
    setTyping(false);
  };

  return (
    <ChatContext.Provider
      value={{
        currentUserId,
        username,
        color,
        users,
        messages,
        typingUsers,
        updateUsername,
        sendMessage,
        setTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
};
