import React, { ReactNode } from 'react';
import { AppSidebar } from '@/components/dashboard_components/app-sidebar';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the Left */}
      <SidebarProvider>
        <div className="flex-shrink-0">
          <AppSidebar />
        </div>

        <SidebarInset>
          {/* Header Section with Breadcrumbs */}
          <header className="flex h-16 sticky top-0 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white shadow-sm">
            <div className="flex items-center gap-2 px-4">
              {/* Sidebar Trigger */}
              <SidebarTrigger className="-ml-1" />

              {/* Separator between Sidebar Trigger and Breadcrumbs */}
              <Separator orientation="vertical" className="mr-2 h-4" />

              {/* Breadcrumb Component */}
              {/* <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Current Page</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> */}
            </div>
          </header>

          {/* Main Content Section */}
          <div className="flex-grow  bg-[#F5F7F9]">{children}</div>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
