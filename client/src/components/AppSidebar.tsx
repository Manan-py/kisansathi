import { Home, MessageCircle, Camera, TrendingUp, Sprout, User, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { useLocation } from "wouter"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "AI Assistant", 
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Disease Detection",
    url: "/disease-detection",
    icon: Camera,
  },
  {
    title: "Market Prices",
    url: "/market-prices", 
    icon: TrendingUp,
  },
  {
    title: "Plant Tracker",
    url: "/plant-tracker",
    icon: Sprout,
  },
]

const accountItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings", 
    icon: Settings,
  },
]

export function AppSidebar() {
  const [location] = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2" data-testid="logo-agritech">
          <Sprout className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">AgriTech</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    data-testid={`nav-${item.title.toLowerCase().replace(' ', '-')}`}
                    isActive={location === item.url}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    data-testid={`nav-${item.title.toLowerCase()}`}
                    isActive={location === item.url}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}