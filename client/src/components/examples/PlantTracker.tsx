import { PlantTracker } from '../PlantTracker'

export default function PlantTrackerExample() {
  //todo: remove mock functionality
  const mockPlants = [
    {
      id: "1",
      name: "Tomato Field A",
      variety: "Roma Tomatoes",
      plantedDate: "March 15, 2024",
      stage: "flowering" as const,
      health: 85,
      daysToHarvest: 45,
      nextWatering: "Tomorrow 6:00 AM",
      nextFertilizer: "In 3 days",
      growthProgress: 65,
      recommendations: [
        "Increase watering frequency due to flowering stage",
        "Apply phosphorus-rich fertilizer to support fruit development",
        "Monitor for early blight symptoms on lower leaves"
      ]
    },
    {
      id: "2",
      name: "Wheat Field B",
      variety: "Durum Wheat",
      plantedDate: "January 10, 2024",
      stage: "harvest" as const,
      health: 92,
      daysToHarvest: 5,
      nextWatering: "Not needed",
      nextFertilizer: "Not needed",
      growthProgress: 98,
      recommendations: [
        "Harvest within the next week for optimal grain quality",
        "Check moisture levels before storage",
        "Prepare field for next rotation crop"
      ]
    },
    {
      id: "3",
      name: "Corn Field C",
      variety: "Sweet Corn",
      plantedDate: "April 1, 2024",
      stage: "vegetative" as const,
      health: 78,
      daysToHarvest: 80,
      nextWatering: "Today 7:00 PM",
      nextFertilizer: "Tomorrow",
      growthProgress: 35,
      recommendations: [
        "Apply nitrogen fertilizer to boost vegetative growth",
        "Consider pest control measures for corn borer",
        "Ensure adequate soil drainage after recent rains"
      ]
    }
  ]

  return <PlantTracker plants={mockPlants} />
}