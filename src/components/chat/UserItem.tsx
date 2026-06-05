import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, Edit, X, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useChat, type ChatUser, OWNER_ID } from "../../contexts/ChatContext";

const UserItem = ({
  user,
  isCurrent,
}: {
  user: ChatUser;
  isCurrent: boolean;
}) => {
  const { updateUsername } = useChat();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const saveEdit = async () => {
    if (!newName.trim()) return;
    try {
      await updateUsername(newName.trim());
      setEditing(false);
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  // Format the last seen time
  const formatLastSeen = (date: Date | null | undefined) => {
    if (!date) return "Just now";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 min ago";
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "1h ago";
    if (hours < 24) return `${hours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <motion.li
      className={cn(
        "flex items-center justify-between p-4 bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-700/50 hover:shadow-md transition-all duration-300 group",
        user.id === OWNER_ID
          ? "bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30"
          : "bg-slate-800/80 border-slate-700/50"
      )}
      whileHover={{ scale: 0.98, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 w-full">
        {/* Avatar */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg"
            style={{
              border: `2px solid ${user.color}40`,
            }}
          >
            {user.id === OWNER_ID ? (
              <img
                src="/android-chrome-512x512.png"
                alt="Owner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-2xl text-white flex items-center justify-center font-bold shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${user.color}30, ${user.color})`,
                  border: `2px solid ${user.color}40`
                }}
              >
                <span className="text-sm drop-shadow-sm">{user.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                transition: { 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" as const
                }
              }}
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-slate-800 shadow-sm"
            />
        </motion.div>

        {!editing ? (
          <div className="flex justify-between w-full items-center">
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200 text-sm inline-flex items-center gap-1 whitespace-nowrap">
                  {user.name}
                  {user.id === OWNER_ID && (
                    <>
                      <Crown className="w-3 h-3 text-yellow-400" />
                      <span className="text-[10px] bg-yellow-400 text-black px-1 rounded">
                        OWNER
                      </span>
                    </>
                  )}
                </span>
                {isCurrent && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs rounded-full font-medium"
                  >
                    You
                  </motion.span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isCurrent ? "Online • Editing available" : formatLastSeen(user.lastSeen)}
              </p>
            </div>

            {isCurrent && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditing(true)}
                  className="w-8 h-8 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity border-0"
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full">
            <Input
              ref={inputRef}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="h-8 text-sm rounded-xl border-2 border-cyan-500/50 focus:border-cyan-400 bg-slate-700/80 text-slate-200"
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") setEditing(false);
              }}
            />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setEditing(false)}
                className="h-8 w-8 hover:bg-red-500/20 hover:text-red-400 rounded-xl border-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="ghost"
                onClick={saveEdit}
                className="h-8 w-8 hover:bg-green-500/20 hover:text-green-400 rounded-xl border-0"
              >
                <Check className="w-3 h-3" />
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.li>
  );
};

export default UserItem;