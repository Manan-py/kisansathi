import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileCard } from "@/components/ProfileCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Save, Plus, X } from "lucide-react"
import { useState } from "react"

export default function Profile() {
  //todo: remove mock functionality
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    role: "Farm Owner",
    location: "Ludhiana, Punjab", 
    joinDate: "March 2023",
    farmSize: "25 acres",
    mainCrops: ["Wheat", "Rice", "Corn", "Sugarcane"]
  })

  const [newCrop, setNewCrop] = useState("")

  const handleSaveProfile = () => {
    console.log('Saving profile changes...')
  }

  const addCrop = () => {
    if (newCrop && !profile.mainCrops.includes(newCrop)) {
      setProfile(prev => ({
        ...prev,
        mainCrops: [...prev.mainCrops, newCrop]
      }))
      setNewCrop("")
    }
  }

  const removeCrop = (crop: string) => {
    setProfile(prev => ({
      ...prev,
      mainCrops: prev.mainCrops.filter(c => c !== crop)
    }))
  }

  return (
    <div className="space-y-6" data-testid="page-profile">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
          Profile Settings
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Manage your account information and farming details
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <ProfileCard profile={profile} />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">General Settings</TabsTrigger>
              <TabsTrigger value="farming">Farming Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <Card data-testid="card-general-settings">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role"
                        value={profile.role}
                        onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                        data-testid="input-role"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      data-testid="input-location"
                    />
                  </div>

                  <Button onClick={handleSaveProfile} data-testid="button-save-profile">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="farming" className="space-y-4">
              <Card data-testid="card-farming-details">
                <CardHeader>
                  <CardTitle>Farming Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Farm Size</Label>
                    <Input 
                      id="farmSize"
                      value={profile.farmSize}
                      onChange={(e) => setProfile(prev => ({ ...prev, farmSize: e.target.value }))}
                      data-testid="input-farm-size"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Main Crops</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profile.mainCrops.map((crop) => (
                        <Badge 
                          key={crop} 
                          variant="secondary" 
                          className="flex items-center gap-1"
                          data-testid={`badge-crop-${crop.toLowerCase()}`}
                        >
                          {crop}
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-red-500"
                            onClick={() => removeCrop(crop)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add new crop"
                        value={newCrop}
                        onChange={(e) => setNewCrop(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addCrop()}
                        data-testid="input-new-crop"
                      />
                      <Button 
                        onClick={addCrop}
                        variant="outline"
                        data-testid="button-add-crop"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} data-testid="button-save-farming">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}