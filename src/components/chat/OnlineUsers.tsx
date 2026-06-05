import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

import {
  Check,
  MessageCircle,
  Users,
  Send,
  Sparkles,
  Zap,
  Crown,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { useChat, OWNER_ID } from "../../contexts/ChatContext";
import UserItem from "./UserItem";

const OnlineUsers = () => {
  const {
    users,
    messages,
    username,
    currentUserId,
    sendMessage,
    typingUsers,
    setTyping,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const usersCount = users.length;

  // Unread count
  const unreadCount = messages.filter(
    (m) => !m.readBy.includes(currentUserId) && m.userId !== currentUserId
  ).length;

  // Auto scroll with manual scroll detection
  const scrollToBottom = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (chatContainerRef.current && shouldAutoScroll) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 50);
  }, [shouldAutoScroll]);

  // Handle manual scroll
  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    setShouldAutoScroll(isNearBottom);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, shouldAutoScroll, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Send Message with error handling
  const handleSendMessage = async () => {
    const value = inputRef.current?.value || "";
    if (!value.trim()) return;

    setIsSending(true);
    setErrorMsg("");

    try {
      await sendMessage(value.trim());
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setShouldAutoScroll(true);
      scrollToBottom();
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSending(false);
    }
  };

  // Message animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  } as const;

  // Typing bubble text formatter
  const typingText = (() => {
    if (typingUsers.length === 0) return "";

    const names = typingUsers.map((u) => u.name);

    if (names.length === 1) return `${names[0]} is typing…`;
    if (names.length === 2) return `${names[0]} and ${names[1]} are typing…`;

    return `${names.slice(0, 3).join(", ")}${names.length > 3 ? "…" : ""} are typing…`;
  })();

  //sort users to show owner on top
  const sortedUsers = [...users].sort((a, b) => {
  if (a.id === OWNER_ID) return -1;
  if (b.id === OWNER_ID) return 1;
  return 0;
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative h-fit w-fit transition-all duration-300 hover:scale-105 group p-3 rounded-2xl",
            usersCount <= 0 ? "opacity-50" : "opacity-100",
            "bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80",
            "border border-slate-700/50 hover:border-cyan-500/30",
            "shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm"
          )}
        >
          <div className="relative flex items-center gap-3">
            {/* Online Indicator */}
            <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping" />
            </div>
            {/* Text Content */}
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300">
                Live Chat
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold text-sm">
                {usersCount} online
              </span>
            </div>

            {/* Unread Badge */}
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-xs font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </motion.div>
            )}

            {/* Connection Pulse Effect */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
            />
          </div>
        </Button>
      </PopoverTrigger>

      {/* POPUP CONTENT */}
      <PopoverContent
        className="w-80 sm:w-96 p-0 border-0 shadow-2xl rounded-2xl overflow-hidden bg-transparent"
        align="end"
        sideOffset={12}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl"
        >
          <Tabs
            defaultValue="chat"
            className="w-full h-[32rem] flex flex-col"
            onValueChange={(v) => v === "chat" && scrollToBottom()}
          >
            {/* TAB HEADERS */}
            <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-b border-slate-700/50">
              <TabsList className="w-full h-14 bg-transparent p-2 gap-1">
                {/* Chat tab */}
                <TabsTrigger
                  value="chat"
                  className="flex-1 data-[state=active]:bg-slate-800/80 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-cyan-500/30 rounded-xl transition-all duration-300 group backdrop-blur-sm"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-slate-200">Chat</span>
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-red-500 rounded-full"
                      />
                    )}
                  </motion.div>
                </TabsTrigger>

                {/* Users tab */}
                <TabsTrigger
                  value="users"
                  className="flex-1 data-[state=active]:bg-slate-800/80 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-500/30 rounded-xl transition-all duration-300 group backdrop-blur-sm"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2"
                  >
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-slate-200">Users</span>
                  </motion.div>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* USERS TAB */}
            <TabsContent value="users"   className="flex flex-col flex-1 overflow-hidden m-0">
              {/* Header */}
              <div className="p-4 text-center space-y-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
                >
                  <Users className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Online Users
                  </h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-slate-400 mt-1"
                  >
                    {usersCount} user{usersCount === 1 ? "" : "s"} connected
                  </motion.p>
                </div>
              </div>
              <ScrollArea 
                className="flex-1 p-4 overscroll-contain"
                onWheel={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* User List */}
                  <div className="grid gap-3">
                    {sortedUsers.map((u, index) => (
                      <motion.div
                        key={u.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <UserItem
                          user={u}
                          isCurrent={u.id === currentUserId}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Empty State */}
                  {usersCount <= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-4 text-sm text-cyan-300 font-medium backdrop-blur-sm"
                    >
                      <Sparkles className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                      Invite a friend to real-time chat
                    </motion.div>
                  )}
                </motion.div>
              </ScrollArea>
            </TabsContent>

            {/* CHAT TAB */}
            <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0">
              
              {/* Messages Area */}
              <div 
                className="flex-1 overflow-y-auto p-4 overscroll-contain bg-gradient-to-b from-slate-900/50 to-slate-800/30" 
                ref={chatContainerRef}
                onScroll={handleScroll}
                onWheel={(e) => e.stopPropagation()}
              >
                <AnimatePresence initial={false}>
                  {messages.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center p-8"
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl flex items-center justify-center mb-4 shadow-inner border border-slate-700/50">
                        <MessageCircle className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h3 className="text-slate-200 font-semibold text-lg mb-2">
                        No messages yet
                      </h3>
                      <p className="text-sm text-slate-400 max-w-xs">
                        Start the conversation! Your messages will appear here with beautiful animations.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((m, index) => {
                        const isMe = m.userId === currentUserId;
                        const everyoneRead = users.every((u) =>
                          m.readBy.includes(u.id)
                        );

                        return (
                          <motion.div
                            key={m.id}
                            variants={messageVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                              "p-4 rounded-2xl max-w-[85%] shadow-sm border backdrop-blur-sm",
                              isMe
                                ? "ml-auto bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-cyan-500/20"
                                : "mr-auto bg-slate-800/80 text-slate-200 shadow-slate-700/20 border-slate-700/50"
                            )}
                          >
                            {/* Message Header */}
                            <div className="flex items-center gap-2 mb-2">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-3 h-3 rounded-full shadow-sm"
                                style={{ backgroundColor: m.color }}
                              />
                              <span
                                className={cn(
                                  "font-semibold text-sm flex items-center gap-1",
                                  isMe ? "text-cyan-100" : "text-slate-300"
                                )}
                              >
                                {m.username}

                                {m.userId === OWNER_ID && (
                                  <>
                                    <Crown className="w-3 h-3 text-yellow-400" />
                                    <span className="text-[10px] bg-yellow-400 text-black px-1 rounded">
                                      OWNER
                                    </span>
                                  </>
                                )}

                                {isMe && (
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-cyan-200"
                                  >
                                    (You)
                                  </motion.span>
                                )}
                              </span>
                            </div>

                            {/* Message Text */}
                            <p className="text-sm leading-relaxed break-words mb-2">
                              {m.text}
                            </p>

                            {/* Footer with timestamp and read status */}
                            <div className="flex items-center justify-between gap-2 text-xs opacity-75">
                              <div className="flex items-center gap-1">
                                {m.timestamp && (
                                  <span className={cn(
                                    isMe ? "text-cyan-100/70" : "text-slate-400/70"
                                  )}>
                                    {new Date(m.timestamp).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                )}
                              </div>

                              {isMe && (
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  className={cn(
                                    "flex items-center gap-0.5 ml-auto",
                                    everyoneRead ? "text-green-300" : "text-cyan-100/70"
                                  )}
                                >
                                  {everyoneRead ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      <Check className="w-3 h-3 -ml-1.5" />
                                    </>
                                  ) : (
                                    <Check className="w-3 h-3" />
                                  )}
                                </motion.span>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Typing Indicator */}
              <AnimatePresence>
                {typingUsers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="mx-4 mb-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 text-xs rounded-full shadow border border-cyan-500/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ 
                          opacity: [0.3, 1, 0.3],
                          transition: { 
                            duration: 1.5, 
                            repeat: Infinity,
                            ease: "easeInOut" as const
                          }
                        }}
                        className="flex gap-1"
                      >
                        <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                        <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                        <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                      </motion.div>
                      <span className="font-medium">{typingText}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Area */}
              <div className="border-t border-slate-700/50 bg-gradient-to-t from-slate-900/80 to-slate-800/50 backdrop-blur-lg p-4 space-y-2">
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {errorMsg}
                  </motion.div>
                )}

                <div className="flex items-center gap-2">
                  <Input
                    ref={inputRef}
                    className="rounded-2xl border-2 border-slate-600/50 focus:border-cyan-400 transition-all duration-300 bg-slate-800/80 text-slate-200 placeholder-slate-400 shadow-sm h-11 disabled:opacity-50"
                    placeholder={`Message as ${username}…`}
                    onChange={() => setTyping(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isSending) handleSendMessage();
                    }}
                    disabled={isSending}
                  />

                  <motion.div 
                    whileHover={!isSending ? { scale: 1.05 } : {}} 
                    whileTap={!isSending ? { scale: 0.95 } : {}}
                  >
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={isSending}
                      className="rounded-2xl w-11 h-11 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-4 h-4"
                        >
                          <Zap className="w-4 h-4" />
                        </motion.div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </motion.div>
                </div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs text-slate-400 flex items-center justify-center gap-1"
                >
                  <Zap className="w-3 h-3" />
                  Press Enter to send • Connected as {username}
                </motion.p>
              </div>
            </TabsContent>

          </Tabs>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export default OnlineUsers;
