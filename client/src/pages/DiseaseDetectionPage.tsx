import { DiseaseDetection } from "@/components/DiseaseDetection"

export default function DiseaseDetectionPage() {
  return (
    <div className="space-y-6" data-testid="page-disease-detection">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
          Plant Disease Detection
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Upload images of your plants to detect diseases and get treatment recommendations
        </p>
      </div>
      <DiseaseDetection />
    </div>
  )
}