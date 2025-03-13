// components/NotificationBell.tsx
"use client";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/context/notificationsContext";

interface NotificationBellProps {
  onClick: () => void;
}

const NotificationBell = ({ onClick }: NotificationBellProps) => {
  const { unreadCount, connected } = useNotifications();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="relative"
      aria-label="Notifications"
    >
      <BellIcon className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
      <span className="sr-only">
        {unreadCount} unread notifications
      </span>
      <div className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-400'}`} />
    </Button>
  );
};

export default NotificationBell;