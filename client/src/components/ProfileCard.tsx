import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Edit } from "lucide-react"
import farmerAvatar from "@assets/generated_images/Farmer_profile_avatar_c0429d9f.png"

interface UserProfile {
  name: string
  role: string
  location: string
  joinDate: string
  farmSize: string
  mainCrops: string[]
  avatar?: string
}

interface ProfileCardProps {
  profile: UserProfile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card data-testid="card-profile">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Profile</CardTitle>
          <Button variant="ghost" size="sm" data-testid="button-edit-profile">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16" data-testid="avatar-user">
            <AvatarImage src={profile.avatar || farmerAvatar} alt={profile.name} />
            <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg" data-testid="text-user-name">
              {profile.name}
            </h3>
            <p className="text-muted-foreground" data-testid="text-user-role">
              {profile.role}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span data-testid="text-location">{profile.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span data-testid="text-join-date">Joined {profile.joinDate}</span>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Farm Size: <span className="text-foreground" data-testid="text-farm-size">{profile.farmSize}</span></div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Main Crops</h4>
          <div className="flex flex-wrap gap-1">
            {profile.mainCrops.map((crop) => (
              <Badge key={crop} variant="outline" data-testid={`badge-crop-${crop.toLowerCase()}`}>
                {crop}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}