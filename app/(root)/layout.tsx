"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Existing imports
import { AppSidebar } from "@/components/dashboard_components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import SegmentProgressBarLoader from "@/components/main_components/progress_bar_loader/progress_bar_loader";
import { useUser } from "@auth0/nextjs-auth0/client";
// Breadcrumb imports
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Bell } from "lucide-react";

// 1) Import your new NotificationSheet component
import NotificationSheet from "@/components/main_components/notification_sheet/notification_sheet";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false); // track sheet visibility

  const pathname = usePathname();

  // Simulate a loading delay whenever the route changes
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="flex min-h-screen relative">
      <SidebarProvider>
        {/* Left Sidebar */}
        <div className="flex-shrink-0">
          <AppSidebar />
        </div>

        {/* Main Area with optional sidebar inset */}
        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 sticky top-0 shrink-0 items-center gap-2 bg-white shadow-sm z-index-40">
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              {/* Left side: Sidebar trigger + Breadcrumb */}
              <div className="flex items-center">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb >
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Current Page</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Right side: Notification Bell */}
              <div
                onClick={() => setSheetOpen(true)}
                className="cursor-pointer hover:scale-95 hover:bg-gray-200 p-1 rounded-full"
              >
                <Bell className="size-6 p-1 transition duration-300 hover:scale-95 hover:bg-zinc-200 hover:rounded-full" />
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-grow bg-[#F5F7F9] relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
                <SegmentProgressBarLoader
                  totalSegments={40}
                  loadingTime={3000}
                />
              </div>
            ) : (
              children
            )}
          </div>

          <Toaster />
        </SidebarInset>
      </SidebarProvider>

      {/* 2) Render the NotificationSheet outside the header,
            controlled by sheetOpen state */}
      <NotificationSheet open={sheetOpen} onOpenChange={setSheetOpen} userId={user?.sub || ""} />
    </div>
  );
};

export default Layout;
