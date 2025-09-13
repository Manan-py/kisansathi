import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from "lucide-react"
import { useLocation } from "wouter"
import farmerAvatar from "@assets/generated_images/Farmer_profile_avatar_c0429d9f.png"

interface UserProfile {
  name: string
  role: string
  avatar?: string
}

interface UserProfileIconProps {
  profile: UserProfile
}

export function UserProfileIcon({ profile }: UserProfileIconProps) {
  const [, setLocation] = useLocation()

  const handleProfileClick = () => {
    setLocation('/profile')
  }

  const handleSettingsClick = () => {
    setLocation('/settings')
  }

  const handleLogout = () => {
    console.log('Logging out user...')
    // TODO: Implement actual logout logic
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" data-testid="button-user-profile">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile.avatar || farmerAvatar} alt={profile.name} />
            <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" data-testid="dropdown-user-menu">
        <div className="px-2 py-2">
          <p className="text-sm font-medium" data-testid="text-user-name">
            {profile.name}
          </p>
          <p className="text-xs text-muted-foreground" data-testid="text-user-role">
            {profile.role}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileClick} data-testid="menu-profile">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettingsClick} data-testid="menu-settings">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}