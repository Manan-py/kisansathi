import { UserProfileIcon } from '../UserProfileIcon'

export default function UserProfileIconExample() {
  //todo: remove mock functionality
  const mockProfile = {
    name: "Rajesh Kumar",
    role: "Farm Owner"
  }

  return <UserProfileIcon profile={mockProfile} />
}