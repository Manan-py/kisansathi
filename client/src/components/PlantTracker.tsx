import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sprout, Droplets, Sun, Calendar, Plus, TrendingUp } from "lucide-react"

interface Plant {
  id: string
  name: string
  variety: string
  plantedDate: string
  stage: "seedling" | "vegetative" | "flowering" | "fruiting" | "harvest"
  health: number
  daysToHarvest: number
  nextWatering: string
  nextFertilizer: string
  growthProgress: number
  recommendations: string[]
}

interface PlantTrackerProps {
  plants: Plant[]
}

const stageColors = {
  seedling: "bg-green-200 text-green-800",
  vegetative: "bg-blue-200 text-blue-800", 
  flowering: "bg-yellow-200 text-yellow-800",
  fruiting: "bg-orange-200 text-orange-800",
  harvest: "bg-red-200 text-red-800"
}

const stageIcons = {
  seedling: "🌱",
  vegetative: "🌿", 
  flowering: "🌸",
  fruiting: "🍅",
  harvest: "🧺"
}

export function PlantTracker({ plants }: PlantTrackerProps) {
  const [selectedPlant, setSelectedPlant] = useState(plants[0])

  const addNewPlant = () => {
    console.log('Adding new plant...')
  }

  const waterPlant = (plantId: string) => {
    console.log('Watering plant:', plantId)
  }

  const addFertilizer = (plantId: string) => {
    console.log('Adding fertilizer to plant:', plantId)
  }

  return (
    <div className="space-y-6" data-testid="container-plant-tracker">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Plant Growth Tracker
            </CardTitle>
            <Button onClick={addNewPlant} data-testid="button-add-plant">
              <Plus className="h-4 w-4 mr-2" />
              Add Plant
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Plant Details</TabsTrigger>
              <TabsTrigger value="schedule">Care Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {plants.map((plant) => (
                  <Card 
                    key={plant.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedPlant.id === plant.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedPlant(plant)}
                    data-testid={`card-plant-${plant.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold" data-testid={`text-plant-name-${plant.id}`}>
                          {plant.name}
                        </h3>
                        <span className="text-lg" data-testid={`icon-stage-${plant.id}`}>
                          {stageIcons[plant.stage]}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2" data-testid={`text-variety-${plant.id}`}>
                        {plant.variety}
                      </p>
                      
                      <Badge 
                        className={stageColors[plant.stage]}
                        data-testid={`badge-stage-${plant.id}`}
                      >
                        {plant.stage}
                      </Badge>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Health</span>
                          <span data-testid={`text-health-${plant.id}`}>{plant.health}%</span>
                        </div>
                        <Progress value={plant.health} className="h-2" />
                        
                        <div className="flex justify-between text-sm">
                          <span>Growth Progress</span>
                          <span data-testid={`text-progress-${plant.id}`}>{plant.growthProgress}%</span>
                        </div>
                        <Progress value={plant.growthProgress} className="h-2" />
                      </div>
                      
                      <div className="mt-3 text-xs text-muted-foreground">
                        <div data-testid={`text-harvest-${plant.id}`}>
                          Harvest in {plant.daysToHarvest} days
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4">
              {selectedPlant && (
                <Card data-testid="card-plant-details">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span data-testid="text-selected-plant-name">{selectedPlant.name}</span>
                      <span>{stageIcons[selectedPlant.stage]}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Plant Information</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Variety:</span>
                            <span data-testid="text-detail-variety">{selectedPlant.variety}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Planted:</span>
                            <span data-testid="text-detail-planted">{selectedPlant.plantedDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Stage:</span>
                            <Badge className={stageColors[selectedPlant.stage]} data-testid="badge-detail-stage">
                              {selectedPlant.stage}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Growth Metrics</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Health Score</span>
                              <span data-testid="text-detail-health">{selectedPlant.health}%</span>
                            </div>
                            <Progress value={selectedPlant.health} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Growth Progress</span>
                              <span data-testid="text-detail-progress">{selectedPlant.growthProgress}%</span>
                            </div>
                            <Progress value={selectedPlant.growthProgress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        AI Recommendations
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {selectedPlant.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2" data-testid={`recommendation-${index}`}>
                            <span className="text-primary mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card data-testid="card-watering-schedule">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      Watering Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {plants.map((plant) => (
                        <div key={plant.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <div className="font-medium" data-testid={`watering-plant-${plant.id}`}>
                              {plant.name}
                            </div>
                            <div className="text-sm text-muted-foreground" data-testid={`watering-next-${plant.id}`}>
                              Next: {plant.nextWatering}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => waterPlant(plant.id)}
                            data-testid={`button-water-${plant.id}`}
                          >
                            <Droplets className="h-4 w-4 mr-1" />
                            Water
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card data-testid="card-fertilizer-schedule">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-yellow-500" />
                      Fertilizer Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {plants.map((plant) => (
                        <div key={plant.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <div className="font-medium" data-testid={`fertilizer-plant-${plant.id}`}>
                              {plant.name}
                            </div>
                            <div className="text-sm text-muted-foreground" data-testid={`fertilizer-next-${plant.id}`}>
                              Next: {plant.nextFertilizer}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addFertilizer(plant.id)}
                            data-testid={`button-fertilize-${plant.id}`}
                          >
                            <Sun className="h-4 w-4 mr-1" />
                            Fertilize
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}