"use client"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@nextui-org/react"
import { useState } from "react"

export default function LabStaffPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [pathology, setPathology] = useState("")
  const [image, setImage] = useState(null)
  const [doctorEmail, setDoctorEmail] = useState("") 
  const [patientEmail, setPatientEmail] = useState("")
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])


  const handleDoctorSearch = async (e) => {
    const searchQuery = e.target.value;
    try {
      const response = await fetch(`/api/fetchuser`);
      const data = await response.json();
      const doctors = data.filter(user => (user.role === "doctor") && (user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(searchQuery.toLowerCase())));
      setDoctors(doctors);
    } catch (error) {
      console.error("Error searching for doctors:", error);
    }
  }
  
  const handlePatientSearch = async (e) => {
    const searchQuery = e.target.value;
    try {
      const res = await fetch(`/api/fetchuser`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      
      });

      const data = await res.json();
      const patients = data.filter(user => (user.role === "patient") && (user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(searchQuery.toLowerCase())));
      setPatients(patients);
      console.log(patients);
    } catch (error) {
      console.error("Error searching for patients:", error)
    }
  }
  

  const handleDoctorSelect = (email) => {
    setDoctorEmail(email)
    setName("") // Clear the name input field after selection
    setDoctors([]) // Clear the doctor list
  }

  const handlePatientSelect = (email) => {
    setPatientEmail(email)
    setName("") // Clear the name input field after selection
    setPatients([]) // Clear the patient list
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("pathology", pathology)
    formData.append("image", image)
    formData.append("doctorEmail", doctorEmail)
    formData.append("patientEmail", patientEmail)
  
    try {
      const response = await fetch("/api/upload-images", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (data.message === "Image uploaded successfully") {
        alert("Image uploaded successfully")
      } else {
        alert("Error uploading image")
      }
      
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-200 bg-opacity-50 backdrop-blur-lg">
      <Card className="max-w-sm bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-8">
        <CardHeader>
          <CardTitle className="text-xl text-black">Upload a new Scan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-800">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={pathology}
                onChange={(e) => setPathology(e.target.value)}
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
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="doctor" className="text-gray-800">
                Doctor
              </Label>
              <Input
                id="doctor"
                type="text"
                placeholder="Search for Doctor"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                value={doctorEmail}
                onChange={(e) => setDoctorEmail(e.target.value)}
                onKeyUp={handleDoctorSearch}
              />
              {doctors.length > 0 && (
                <ul>
                  {doctors.map((doctor) => (
                    <li style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', margin: '10px 0', backgroundColor: '#f9f9f9',borderRadius:'5px'}} key={doctor.email} onClick={() => handleDoctorSelect(doctor.email)} >
                      {doctor.firstName} {doctor.lastName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="patient" className="text-gray-800">
                Patient
              </Label>
              <Input
                id="patient"
                type="text"
                placeholder="Search for Patient"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                onKeyUp={handlePatientSearch}
              />
              {patients.length > 0 && (
                <ul>
                  {patients.map((patient) => (
                    <li key={patient.email} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', margin: '10px 0', backgroundColor: '#f9f9f9',borderRadius:'5px' }} onClick={() => handlePatientSelect(patient.email)}>
                      {patient.firstName} {patient.lastName}
                    </li>
                  ))}
                </ul>
              )}
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
