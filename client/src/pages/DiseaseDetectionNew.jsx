import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import healthyLeaf from '@assets/generated_images/Healthy_plant_leaf_sample_d2497f18.png';
import diseasedLeaf from '@assets/generated_images/Diseased_plant_leaf_sample_d3043152.png';

export default function DiseaseDetectionNew() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const mockResults = [
        {
          disease: "स्वस्थ पौधा",
          confidence: 95,
          severity: "कम",
          treatment: "कोई इलाज की जरूरत नहीं। नियमित देखभाल जारी रखें।",
          prevention: "अच्छी सिंचाई और धूप बनाए रखें।"
        },
        {
          disease: "पत्ती पर धब्बे की बीमारी", 
          confidence: 87,
          severity: "मध्यम",
          treatment: "तांबा आधारित फफूंदनाशक का छिड़काव करें। प्रभावित पत्तियों को हटा दें।",
          prevention: "हवा का अच्छा प्रवाह बनाएं, ऊपर से पानी न दें।"
        },
        {
          disease: "बैक्टीरियल ब्लाइट",
          confidence: 92,
          severity: "ज्यादा",
          treatment: "संक्रमित भागों को तुरंत हटाएं। बैक्टीरिसाइड स्प्रे करें।",
          prevention: "बीमारी प्रतिरोधी किस्मों का उपयोग करें।"
        }
      ];
      
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const useSampleImage = (type) => {
    setSelectedImage(type === 'healthy' ? healthyLeaf : diseasedLeaf);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" data-testid="page-disease-detection-new">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          🔬 पौधों की बीमारी पहचान
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          अपने पौधे की तस्वीर अपलोड करें और तुरंत बीमारी की पहचान करें
        </p>
      </div>

      <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            📷 तस्वीर अपलोड करें
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Upload Area */}
          <div className="border-4 border-dashed border-green-300 dark:border-green-600 rounded-2xl p-12 text-center bg-green-50 dark:bg-green-900/20">
            {selectedImage ? (
              <div className="space-y-6">
                <img 
                  src={selectedImage} 
                  alt="Plant sample" 
                  className="max-w-full h-64 object-contain mx-auto rounded-xl shadow-lg"
                  data-testid="img-plant-sample"
                />
                <Button 
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-4 rounded-xl"
                  data-testid="button-analyze"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="h-6 w-6 mr-3 animate-spin" />
                      विश्लेषण हो रहा है...
                    </>
                  ) : (
                    <>
                      <Camera className="h-6 w-6 mr-3" />
                      पौधे का विश्लेषण करें
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="mx-auto h-20 w-20 bg-green-200 dark:bg-green-700 rounded-full flex items-center justify-center">
                  <Upload className="h-10 w-10 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    पौधे की तस्वीर अपलोड करें
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    पत्तियों की साफ तस्वीर लें ताकि बीमारी की सही पहचान हो सके
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button 
                    asChild 
                    className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-4 rounded-xl"
                    data-testid="button-upload"
                  >
                    <span className="cursor-pointer">तस्वीर चुनें</span>
                  </Button>
                </label>
              </div>
            )}
          </div>

          {/* Sample Images */}
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => useSampleImage('healthy')}
              className="text-lg px-6 py-3 rounded-xl border-2 border-green-300"
              data-testid="button-sample-healthy"
            >
              ✅ स्वस्थ पौधा देखें
            </Button>
            <Button 
              variant="outline" 
              onClick={() => useSampleImage('diseased')}
              className="text-lg px-6 py-3 rounded-xl border-2 border-red-300"
              data-testid="button-sample-diseased"
            >
              🦠 बीमार पौधा देखें
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden" data-testid="card-analysis-result">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              {result.disease === "स्वस्थ पौधा" ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              )}
              विश्लेषण परिणाम
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    पहचानी गई बीमारी
                  </h3>
                  <p className="text-2xl font-bold text-green-600" data-testid="text-disease-name">
                    {result.disease}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={result.severity === "ज्यादा" ? "destructive" : result.severity === "मध्यम" ? "secondary" : "default"}
                    className="text-lg px-4 py-2"
                    data-testid="badge-severity"
                  >
                    गंभीरता: {result.severity}
                  </Badge>
                  <div className="text-lg">
                    <span className="text-gray-600 dark:text-gray-300">विश्वसनीयता: </span>
                    <span className="font-bold text-green-600" data-testid="text-confidence">
                      {result.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                  <h4 className="text-lg font-bold text-green-700 dark:text-green-300 mb-2">
                    💊 इलाज
                  </h4>
                  <p className="text-green-800 dark:text-green-200" data-testid="text-treatment">
                    {result.treatment}
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <h4 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
                    🛡️ बचाव
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200" data-testid="text-prevention">
                    {result.prevention}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}