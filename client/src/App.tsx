import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserProfileIcon } from "@/components/UserProfileIcon";
import { Sprout } from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import Chat from "@/pages/Chat";
import DiseaseDetectionPage from "@/pages/DiseaseDetectionPage";
import MarketPricesPage from "@/pages/MarketPricesPage";
import PlantTrackerPage from "@/pages/PlantTrackerPage";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/chat" component={Chat} />
      <Route path="/disease-detection" component={DiseaseDetectionPage} />
      <Route path="/market-prices" component={MarketPricesPage} />
      <Route path="/plant-tracker" component={PlantTrackerPage} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  //todo: remove mock functionality  
  const userProfile = {
    name: "Rajesh Kumar",
    role: "Farm Owner"
  };
  
  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-50 flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-3">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <h1 className="font-bold text-lg text-primary hidden sm:flex items-center gap-2">
                <Sprout className="h-5 w-5" />
                AgriTech
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <UserProfileIcon profile={userProfile} />
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 bg-background">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
