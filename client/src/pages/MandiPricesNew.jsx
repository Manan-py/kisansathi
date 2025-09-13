import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MandiPricesNew() {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [prediction, setPrediction] = useState(null);

  const crops = [
    'गेहूं', 'चावल', 'मक्का', 'बाजरा', 'ज्वार', 'दाल', 'सरसों', 'आलू', 'प्याज', 'टमाटर'
  ];

  const locations = [
    'लुधियाना', 'चंडीगढ़', 'अमृतसर', 'जालंधर', 'पटियाला', 'फिरोजपुर', 'भटिंडा'
  ];

  const currentPrices = [
    {
      crop: 'गेहूं',
      price: 2450,
      change: '+70',
      trend: 'up',
      location: 'लुधियाना मंडी'
    },
    {
      crop: 'चावल', 
      price: 3200,
      change: '-150',
      trend: 'down',
      location: 'चंडीगढ़ मंडी'
    },
    {
      crop: 'मक्का',
      price: 1850,
      change: '+30',
      trend: 'up',
      location: 'अमृतसर मंडी'
    }
  ];

  const handlePrediction = () => {
    if (!selectedCrop || !selectedLocation) return;

    const mockPrediction = {
      crop: selectedCrop,
      location: selectedLocation,
      currentPrice: Math.floor(Math.random() * 3000 + 1500),
      predictedPrice: Math.floor(Math.random() * 3500 + 1800),
      suggestion: Math.random() > 0.5 ? 'बेचने का सुझाव' : 'रुकने का सुझाव',
      confidence: Math.floor(Math.random() * 30 + 70),
      priceHistory: [
        { date: 'सोम', price: 2350 },
        { date: 'मंगल', price: 2380 },
        { date: 'बुध', price: 2420 },
        { date: 'गुरु', price: 2400 },
        { date: 'शुक्र', price: 2450 }
      ]
    };

    setPrediction(mockPrediction);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8" data-testid="page-mandi-prices-new">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          💰 मंडी भाव और पूर्वानुमान
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          अपनी फसल की सही कीमत जानें और बेचने का सबसे अच्छा समय पता करें
        </p>
      </div>

      {/* Current Prices */}
      <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-500" />
            आज के भाव
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {currentPrices.map((item, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
                data-testid={`price-card-${index}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {item.crop}
                  </h3>
                  {item.trend === 'up' ? (
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-800 dark:text-white">
                    ₹{item.price}
                    <span className="text-lg text-gray-500 ml-2">/क्विंटल</span>
                  </div>
                  
                  <div className={`text-lg font-semibold ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prediction Input */}
      <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            🔮 कीमत पूर्वानुमान
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                फसल चुनें
              </label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="text-lg h-12">
                  <SelectValue placeholder="फसल का नाम" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop} className="text-lg">
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                स्थान चुनें
              </label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="text-lg h-12">
                  <SelectValue placeholder="मंडी का नाम" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location} className="text-lg">
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handlePrediction}
                disabled={!selectedCrop || !selectedLocation}
                className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3 h-12 w-full rounded-xl"
                data-testid="button-predict"
              >
                <Search className="h-5 w-5 mr-2" />
                पूर्वानुमान देखें
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Result */}
      {prediction && (
        <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl" data-testid="card-prediction-result">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              📊 {prediction.crop} का पूर्वानुमान - {prediction.location}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ₹{prediction.currentPrice}
                    </div>
                    <div className="text-blue-700 dark:text-blue-300">वर्तमान भाव</div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      ₹{prediction.predictedPrice}
                    </div>
                    <div className="text-green-700 dark:text-green-300">अगले सप्ताह</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Badge 
                    variant={prediction.suggestion === 'बेचने का सुझाव' ? 'default' : 'secondary'}
                    className="text-xl px-6 py-3"
                    data-testid="badge-suggestion"
                  >
                    {prediction.suggestion}
                  </Badge>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                    विश्वसनीयता: {prediction.confidence}%
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                  पिछले 5 दिन का भाव
                </h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={prediction.priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, 'भाव']} />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}