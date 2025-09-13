import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserProfileIcon } from "@/components/UserProfileIcon";
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

export default function App() {
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-4 border-b bg-background">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex items-center gap-2">
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
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
