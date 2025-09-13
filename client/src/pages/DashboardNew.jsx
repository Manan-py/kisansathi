import { NewsTicker } from '@/components/NewsTickerNEW';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Sprout, BarChart3 } from 'lucide-react';
import heroImage from '@assets/generated_images/Agricultural_dashboard_hero_background_56601aa9.png';
import farmerAvatar from '@assets/generated_images/Farmer_profile_avatar_c0429d9f.png';

export default function DashboardNew() {
  //todo: remove mock functionality
  const farmerProfile = {
    name: "राजेश कुमार",
    location: "लुधियाना, पंजाब", 
    soilType: "दोमट मिट्टी",
    farmSize: "25 एकड़",
    joinDate: "मार्च 2023"
  };

  const usageData = [
    { title: "कुल फसलें", value: "12", icon: Sprout, color: "text-green-600" },
    { title: "बीमारी जांच", value: "45", icon: BarChart3, color: "text-yellow-600" },
    { title: "मंडी कीमत", value: "89", icon: BarChart3, color: "text-orange-600" },
    { title: "AI सलाह", value: "156", icon: BarChart3, color: "text-blue-600" }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto" data-testid="page-dashboard-new">
      {/* Hero Section */}
      <div 
        className="relative h-40 bg-cover bg-center rounded-2xl overflow-hidden shadow-lg"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="relative h-full flex items-center px-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-3" data-testid="text-dashboard-title">
              नमस्ते, {farmerProfile.name}
            </h1>
            <p className="text-xl text-white/90" data-testid="text-dashboard-subtitle">
              आपके खेती के सपनों को साकार करने में हमारी सहायता करें
            </p>
          </div>
        </div>
      </div>

      {/* News Ticker */}
      <NewsTicker />

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Farmer Profile */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0 bg-white dark:bg-gray-800 rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                किसान प्रोफाइल
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <img 
                  src={farmerAvatar}
                  alt="Farmer Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white" data-testid="text-farmer-name">
                    {farmerProfile.name}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">किसान</p>
                </div>
              </div>

              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300" data-testid="text-location">
                    {farmerProfile.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Sprout className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300" data-testid="text-soil-type">
                    मिट्टी: {farmerProfile.soilType}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300" data-testid="text-farm-size">
                    खेत का आकार: {farmerProfile.farmSize}
                  </span>
                </div>
              </div>

              <Badge variant="outline" className="text-lg px-4 py-2">
                सदस्य बने: {farmerProfile.joinDate}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Usage Data */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 bg-white dark:bg-gray-800 rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                उपयोग डेटा
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                {usageData.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow"
                    data-testid={`usage-card-${index}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                      <span className="text-3xl font-bold text-gray-800 dark:text-white">
                        {item.value}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-lg text-green-700 dark:text-green-300">सफलता दर</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-600">24/7</div>
                  <div className="text-lg text-yellow-700 dark:text-yellow-300">AI सहायता</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">₹50,000+</div>
                  <div className="text-lg text-orange-700 dark:text-orange-300">बचत</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}