import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Camera, AlertTriangle, CheckCircle, Loader } from "lucide-react"
import healthyLeaf from "@assets/generated_images/Healthy_plant_leaf_sample_d2497f18.png"
import diseasedLeaf from "@assets/generated_images/Diseased_plant_leaf_sample_d3043152.png"

interface DiseaseResult {
  disease: string
  confidence: number
  severity: "low" | "medium" | "high"
  treatment: string
  prevention: string
}

export function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DiseaseResult | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)
    
    // Simulate analysis with mock results
    setTimeout(() => {
      const mockResults = [
        {
          disease: "Healthy Plant",
          confidence: 95,
          severity: "low" as const,
          treatment: "No treatment needed. Continue regular care.",
          prevention: "Maintain good watering schedule and ensure adequate sunlight."
        },
        {
          disease: "Leaf Spot Disease", 
          confidence: 87,
          severity: "medium" as const,
          treatment: "Apply copper-based fungicide. Remove affected leaves.",
          prevention: "Improve air circulation, avoid overhead watering, use drip irrigation."
        },
        {
          disease: "Bacterial Blight",
          confidence: 92,
          severity: "high" as const,
          treatment: "Remove infected parts immediately. Apply bactericide spray.",
          prevention: "Use disease-resistant varieties, practice crop rotation."
        }
      ]
      
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)])
      setIsAnalyzing(false)
    }, 2000)
  }

  const useSampleImage = (type: "healthy" | "diseased") => {
    setSelectedImage(type === "healthy" ? healthyLeaf : diseasedLeaf)
    setResult(null)
  }

  return (
    <Card data-testid="card-disease-detection">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Disease Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          {selectedImage ? (
            <div className="space-y-4">
              <img 
                src={selectedImage} 
                alt="Plant sample" 
                className="max-w-full h-48 object-contain mx-auto rounded-md"
                data-testid="img-plant-sample"
              />
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  data-testid="button-analyze"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      Analyze Plant
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Upload Plant Image</h3>
                <p className="text-muted-foreground">
                  Take a clear photo of the plant leaves for disease analysis
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
                <Button asChild data-testid="button-upload">
                  <span className="cursor-pointer">Choose Image</span>
                </Button>
              </label>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => useSampleImage("healthy")}
            data-testid="button-sample-healthy"
          >
            Try Healthy Sample
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => useSampleImage("diseased")}
            data-testid="button-sample-diseased"
          >
            Try Diseased Sample
          </Button>
        </div>

        {result && (
          <Card data-testid="card-analysis-result">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.disease === "Healthy Plant" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                Analysis Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium" data-testid="text-disease-name">
                    {result.disease}
                  </span>
                  <Badge 
                    variant={result.severity === "high" ? "destructive" : result.severity === "medium" ? "secondary" : "default"}
                    data-testid={`badge-severity-${result.severity}`}
                  >
                    {result.severity} severity
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Confidence</span>
                    <span data-testid="text-confidence">{result.confidence}%</span>
                  </div>
                  <Progress value={result.confidence} className="h-2" data-testid="progress-confidence" />
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-green-700 dark:text-green-400">Treatment</h4>
                  <p className="text-muted-foreground" data-testid="text-treatment">
                    {result.treatment}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-400">Prevention</h4>
                  <p className="text-muted-foreground" data-testid="text-prevention">
                    {result.prevention}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}