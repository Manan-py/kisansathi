import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Settings as SettingsIcon, Bell, Shield, Globe } from "lucide-react"
import { useState } from "react"

export default function Settings() {
  //todo: remove mock functionality
  const [settings, setSettings] = useState({
    notifications: {
      weatherAlerts: true,
      priceUpdates: false,
      plantReminders: true,
      newsUpdates: false
    },
    preferences: {
      language: "en",
      timezone: "Asia/Kolkata",
      currency: "INR",
      units: "metric"
    }
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }))
  }

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }))
  }

  return (
    <div className="space-y-6" data-testid="page-settings">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
          Settings
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Configure your application preferences and account settings
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card data-testid="card-general-settings">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <ThemeToggle />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Auto-save Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save your work while using the application
                  </p>
                </div>
                <Switch defaultChecked data-testid="switch-auto-save" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Show Tips</Label>
                  <p className="text-sm text-muted-foreground">
                    Display helpful tips and guides while using features
                  </p>
                </div>
                <Switch defaultChecked data-testid="switch-show-tips" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card data-testid="card-notification-settings">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Weather Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about severe weather conditions
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.weatherAlerts}
                  onCheckedChange={(value) => handleNotificationChange('weatherAlerts', value)}
                  data-testid="switch-weather-alerts"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Price Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when crop prices change significantly
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.priceUpdates}
                  onCheckedChange={(value) => handleNotificationChange('priceUpdates', value)}
                  data-testid="switch-price-updates"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Plant Care Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminders for watering, fertilizing, and other care tasks
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.plantReminders}
                  onCheckedChange={(value) => handleNotificationChange('plantReminders', value)}
                  data-testid="switch-plant-reminders"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">News Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about agricultural news and developments
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.newsUpdates}
                  onCheckedChange={(value) => handleNotificationChange('newsUpdates', value)}
                  data-testid="switch-news-updates"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card data-testid="card-preference-settings">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Regional Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={settings.preferences.language}
                    onValueChange={(value) => handlePreferenceChange('language', value)}
                  >
                    <SelectTrigger data-testid="select-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                      <SelectItem value="pa">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={settings.preferences.timezone}
                    onValueChange={(value) => handlePreferenceChange('timezone', value)}
                  >
                    <SelectTrigger data-testid="select-timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={settings.preferences.currency}
                    onValueChange={(value) => handlePreferenceChange('currency', value)}
                  >
                    <SelectTrigger data-testid="select-currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">₹ Indian Rupee</SelectItem>
                      <SelectItem value="USD">$ US Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="units">Measurement Units</Label>
                  <Select 
                    value={settings.preferences.units}
                    onValueChange={(value) => handlePreferenceChange('units', value)}
                  >
                    <SelectTrigger data-testid="select-units">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric</SelectItem>
                      <SelectItem value="imperial">Imperial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card data-testid="card-security-settings">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full" data-testid="button-change-password">
                  Change Password
                </Button>
                
                <Button variant="outline" className="w-full" data-testid="button-export-data">
                  Export My Data
                </Button>
                
                <Button variant="destructive" className="w-full" data-testid="button-delete-account">
                  Delete Account
                </Button>
              </div>
              
              <div className="pt-4 border-t text-sm text-muted-foreground">
                <p>
                  Your data is encrypted and stored securely. We never share your personal information with third parties without your consent.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}