import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@nextui-org/react"


export default function LabStaffPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-200 bg-opacity-50 backdrop-blur-lg">
      <Card className="max-w-sm bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-8">
        <CardHeader>
          <CardTitle className="text-xl text-black">Upload a new Scan</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-800">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-gray-800">
                Description
              </Label>
              <Input
                id="description"
                type="text"
                placeholder="Description"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pathology" className="text-gray-800">
                Pathology
              </Label>
              <Input
                id="pathology"
                type="text"
                placeholder="Pathology"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image" className="text-gray-800">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="doctor" className="text-gray-800">
                Doctor
              </Label>
              <Input
                id="doctor"
                type="text"
                placeholder="Doctor"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="patient" className="text-gray-800">
                Patient
              </Label>
              <Input
                id="patient"
                type="text"
                placeholder="Patient"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
              />
            </div>
            
            <Button type="submit" color="primary" variant="shadow">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
