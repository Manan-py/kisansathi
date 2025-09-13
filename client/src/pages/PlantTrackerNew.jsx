import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Thermometer, Droplets, Wind, Sun, Sprout, Calendar } from 'lucide-react';

export default function PlantTrackerNew() {
  const [selectedCrop, setSelectedCrop] = useState('गेहूं');

  const weatherData = {
    temperature: '28°C',
    humidity: '65%',
    rainfall: '15mm',
    windSpeed: '12 km/h',
    uvIndex: 'उच्च'
  };

  const irrigationAdvice = {
    nextWatering: 'कल सुबह 6:00 बजे',
    waterAmount: '2 इंच',
    method: 'ड्रिप सिंचाई की सलाह',
    note: 'मिट्टी में नमी 70% है, अभी पानी की जरूरत नहीं'
  };

  const cropRecommendations = {
    'दोमट मिट्टी': [
      { crop: 'गेहूं', suitability: '95%', season: 'रबी' },
      { crop: 'मक्का', suitability: '90%', season: 'खरीफ' },
      { crop: 'चावल', suitability: '85%', season: 'खरीफ' },
      { crop: 'सरसों', suitability: '88%', season: 'रबी' }
    ]
  };

  const fertilizer = [
    {
      type: 'यूरिया',
      amount: '50 किग्रा/एकड़',
      time: 'बुआई के 20 दिन बाद',
      purpose: 'नाइट्रोजन की पूर्ति'
    },
    {
      type: 'DAP',
      amount: '25 किग्रा/एकड़', 
      time: 'बुआई के समय',
      purpose: 'फास्फोरस की पूर्ति'
    },
    {
      type: 'पोटाश',
      amount: '15 किग्रा/एकड़',
      time: 'फूल आने पर',
      purpose: 'फल विकास के लिए'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8" data-testid="page-plant-tracker-new">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          🌱 पौधों की वृद्धि ट्रैकर
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          मौसम के अनुसार सिंचाई, उर्वरक और फसल की सलाह
        </p>
      </div>

      {/* Weather Details */}
      <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            🌤️ आज का मौसम
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl text-center">
              <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-orange-600">{weatherData.temperature}</div>
              <div className="text-orange-700 dark:text-orange-300">तापमान</div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center">
              <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-600">{weatherData.humidity}</div>
              <div className="text-blue-700 dark:text-blue-300">नमी</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center">
              <Droplets className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-600">{weatherData.rainfall}</div>
              <div className="text-green-700 dark:text-green-300">बारिश</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center">
              <Wind className="h-8 w-8 text-gray-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-600">{weatherData.windSpeed}</div>
              <div className="text-gray-700 dark:text-gray-300">हवा की गति</div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl text-center">
              <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-yellow-600">{weatherData.uvIndex}</div>
              <div className="text-yellow-700 dark:text-yellow-300">UV इंडेक्स</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Irrigation Advice */}
        <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              💧 सिंचाई सलाह
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-blue-500" />
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                  अगली सिंचाई
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-2">
                {irrigationAdvice.nextWatering}
              </p>
              <p className="text-blue-700 dark:text-blue-300">
                पानी की मात्रा: {irrigationAdvice.waterAmount}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <span className="text-lg font-semibold">विधि</span>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {irrigationAdvice.method}
                </Badge>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <p className="text-green-800 dark:text-green-200 text-lg">
                  💡 {irrigationAdvice.note}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Recommendations */}
        <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              🌾 फसल सुझाव
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              दोमट मिट्टी के लिए सबसे अच्छी फसलें:
            </div>
            
            <div className="space-y-3">
              {cropRecommendations['दोमट मिट्टी'].map((crop, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <Sprout className="h-6 w-6 text-green-500" />
                    <div>
                      <div className="text-lg font-bold text-gray-800 dark:text-white">
                        {crop.crop}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {crop.season} सीजन
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant="default"
                    className="text-lg px-4 py-2 bg-green-500 text-white"
                  >
                    {crop.suitability}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fertilizer Advice */}
      <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            🧪 उर्वरक और मिट्टी की सलाह
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {fertilizer.map((item, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-700"
              >
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">
                  {item.type}
                </h3>
                
                <div className="space-y-3 text-lg">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">मात्रा: </span>
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      {item.amount}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">समय: </span>
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      {item.time}
                    </span>
                  </div>
                  
                  <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-lg">
                    <span className="text-green-700 dark:text-green-300 text-base">
                      {item.purpose}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
            <h4 className="text-xl font-bold text-yellow-700 dark:text-yellow-300 mb-3">
              🚨 महत्वपूर्ण सुझाव
            </h4>
            <ul className="space-y-2 text-lg text-yellow-800 dark:text-yellow-200">
              <li>• मिट्टी की जांच हर 6 महीने में कराएं</li>
              <li>• जैविक खाद का भी उपयोग करें</li>
              <li>• पानी के साथ उर्वरक न मिलाएं</li>
              <li>• बारिश से पहले उर्वरक डालने से बचें</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}