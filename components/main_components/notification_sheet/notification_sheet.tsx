"use client";
import { FC, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { XIcon } from "lucide-react";

interface NotificationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string; // Add this to identify the user
}

// Helper to return a color style (Tailwind classes) based on priority/urgency
function getPriorityBadgeClasses(priority: string) {
  switch (priority?.toLowerCase()) {
    case "urgent":
      return "bg-red-500 text-white";
    case "high":
      return "bg-orange-500 text-white";
    default:
      // "normal" or anything else
      return "bg-gray-300 text-gray-800";
  }
}

// Interface for notification objects
interface Notification {
  id: string | number;
  title: string;
  body?: string;
  content?: string;
  timestamp: string;
  priority: string;
  type?: string;
  urgent?: boolean;
}

const NotificationSheet: FC<NotificationSheetProps> = ({
  open,
  onOpenChange,
  userId,
}) => {
  // State for notifications - start with an empty array
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // WebSocket connection state
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  
  // Connect to WebSocket when component mounts or userId changes
  useEffect(() => {
    // Only connect if component is mounted and userId is available and sheet is open
    if (!userId || !open) return;
    
    console.log("Attempting to connect to WebSocket with userId:", userId);
    
    // Create WebSocket connection
    const socketInstance = io("http://localhost:4001", {
      query: { userId }
    });
    
    socketInstance.on("connect", () => {
      console.log("Connected to notification WebSocket");
      setConnected(true);
    });
    
    socketInstance.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      setConnected(false);
    });
    
    socketInstance.on("disconnect", () => {
      console.log("Disconnected from notification WebSocket");
      setConnected(false);
    });
    
    socketInstance.on("notification", (data) => {
      console.log("Received notification via WebSocket:", data);
      
      // Format the received notification to match our interface
      const newNotification: Notification = {
        id: data.id,
        title: data.title,
        body: data.body,
        content: data.body, // Set content from body for compatibility
        timestamp: new Date(data.timestamp || Date.now()).toLocaleString(),
        priority: data.urgent ? "Urgent" : "Normal",
        type: "event",
        urgent: data.urgent
      };
      
      // Add the new notification to the state
      setNotifications(prev => [newNotification, ...prev]);
      
      // Acknowledge receipt
      socketInstance.emit("notification:ack", data.id);
    });
    
    // Store the socket instance
    setSocket(socketInstance);
    
    // Cleanup on unmount or when dependencies change
    return () => {
      console.log("Disconnecting WebSocket");
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [userId, open]);
  
  // Fetch existing notifications when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // You would implement this API endpoint to get existing notifications
        const response = await fetch(`/api/notification/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.map(item => ({
            ...item,
            priority: item.urgent ? "Urgent" : "Normal",
            timestamp: new Date(item.timestamp || item.createdAt).toLocaleString()
          })));
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    
    if (userId && open) {
      fetchNotifications();
    }
  }, [userId, open]);
  
  // Function to remove a notification
  const removeNotification = (id: string | number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            {connected ? (
              <span className="text-green-500">● Connected to notification server</span>
            ) : (
              <span className="text-red-500">● Disconnected from notification server</span>
            )}
          </SheetDescription>
        </SheetHeader>
        
        {/* Scrollable container for notifications */}
        <div className="mt-4 space-y-3 max-h-[88%] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="px-3 py-4 bg-zinc-200 rounded-md"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{notification.title}</p>
                  <XIcon 
                    className="size-4 hover:scale-95 cursor-pointer" 
                    onClick={() => removeNotification(notification.id)}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.body || notification.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-500 mt-1">
                    {notification.timestamp}
                  </p>
                  
                  {/* Priority badge */}
                  <div className="mt-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full 
                      ${getPriorityBadgeClasses(notification.priority)}
                    `}
                    >
                      {notification.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;