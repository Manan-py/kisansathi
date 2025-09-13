import { ProfileCard } from '../ProfileCard'

export default function ProfileCardExample() {
  //todo: remove mock functionality
  const mockProfile = {
    name: "Rajesh Kumar",
    role: "Farm Owner",
    location: "Ludhiana, Punjab",
    joinDate: "March 2023",
    farmSize: "25 acres",
    mainCrops: ["Wheat", "Rice", "Corn", "Sugarcane"]
  }

  return <ProfileCard profile={mockProfile} />
}