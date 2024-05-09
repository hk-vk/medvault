"use client"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useState } from "react"
import { useSession } from "@clerk/nextjs"
import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"


function thresholdSegmentation(imageData, threshold) {
  let roiImageData = new ImageData(imageData.width, imageData.height);
  let nonRoiImageData = new ImageData(imageData.width, imageData.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    let pixelValue = imageData.data[i];

    if (pixelValue > threshold) {
      roiImageData.data[i] = imageData.data[i];
      roiImageData.data[i + 1] = imageData.data[i + 1];
      roiImageData.data[i + 2] = imageData.data[i + 2];
      roiImageData.data[i + 3] = imageData.data[i + 3];

      nonRoiImageData.data[i] = 0;
      nonRoiImageData.data[i + 1] = 0;
      nonRoiImageData.data[i + 2] = 0;
      nonRoiImageData.data[i + 3] = 255;
    } else {
      nonRoiImageData.data[i] = imageData.data[i];
      nonRoiImageData.data[i + 1] = imageData.data[i + 1];
      nonRoiImageData.data[i + 2] = imageData.data[i + 2];
      nonRoiImageData.data[i + 3] = imageData.data[i + 3];

      roiImageData.data[i] = 0;
      roiImageData.data[i + 1] = 0;
      roiImageData.data[i + 2] = 0;
      roiImageData.data[i + 3] = 255;
    }
  }

  return { roiImageData, nonRoiImageData };
}

function lzwCompress(uncompressedData) {
  const dictionary = new Map();
  const bitsPerCode = 12;
  const maxCodes = Math.pow(2, bitsPerCode);
  let codeValue = 256;
  let stringValue = "";
  let compressedData = [];

  for (let i = 0; i < 256; i++) {
    dictionary.set(String.fromCharCode(i), i);
  }

  for (let i = 0; i < uncompressedData.length; i++) {
    const currentChar = String.fromCharCode(uncompressedData[i]);
    const currentString = stringValue + currentChar;

    if (!dictionary.has(currentString)) {
      compressedData.push(dictionary.get(stringValue));

      if (codeValue < maxCodes) {
        dictionary.set(currentString, codeValue);
        codeValue++;
      } else {
        dictionary.forEach((value, key, map) => {
          if (key.length > 1) {
            map.delete(key);
          }
        });
        codeValue = 257;
        dictionary.set(currentString, codeValue++);
      }

      stringValue = currentChar;
    } else {
      stringValue = currentString;
    }
  }

  if (stringValue !== "") {
    compressedData.push(dictionary.get(stringValue));
  }

  return compressedData;
}

function compressImageData(imageData) {
  const uncompressedData = new Uint8Array(imageData.data);
  const compressedData = lzwCompress(uncompressedData);
  return compressedData;
}

export default function PatientPage() {
  const [roiImage, setRoiImage] = useState(null);
  const [nonRoiImage, setNonRoiImage] = useState(null);
  const [threshold, setThreshold] = useState(128);
  const [error, setError] = useState(null);
  const [patientName,setPatientName] = useState(null)
  const [doctors,setDoctors] = useState([]);
  const [currentDoctor,setCurrentDoctor] = useState("")
  const { session } = useSession();
  const [imageName,setImageName] = useState(null);
const [imageDescription,setImageDescription] = useState(null);
const [pathology,setPathology] = useState(null);
const [doctorEmail,setDoctorEmail] = useState(null);
const [patientEmail,setPatientEmail] = useState(null);
const [imagePath, setImagePath] = useState(null);



 if (!session || !session.user) {
    return <div>Sign in to view this page</div>;
 }




 const userEmail = session.user.primaryEmailAddress.emailAddress;
 //fetch the firstName+lastname of the patient from the database based on userEmail
 const fetchAllDoctors = async () => {
    try {
      const response = await fetch(`/api/fetchuser`);
      const data = await response.json();
      const doctors = data.filter(user => user.role === "doctor");
      setDoctors(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);

    }
  }
  //find current doctor name based on email
  const fetchCurrentDoctor = async () => {
    try {
      const response = await fetch(`/api/fetchuser`);
      const data = await response.json();
      const patient = data.filter(user => user.email === doctorEmail);
      setCurrentDoctor(patient[0].currentDoctor);
    } catch (error) {
      console.error("Error fetching current doctor:", error);
    }
  }
  if(doctors.length === 0){
    fetchCurrentDoctor();
  }

  const handleDoctorSelect = async (doctorEmail) => {
    try {
      const response = await fetch(`/api/updatedoctor`)
      const data = await response.json();
      const patient = data.filter(user => user.email === userEmail);
      const doctor = data.filter(user => user.email === doctorEmail);
      const body = {email: userEmail, doctorEmail: doctorEmail};
    }
    catch (error) { 
      console.error("Error updating doctor:", error);
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        const { roiImageData, nonRoiImageData } = thresholdSegmentation(imageData, threshold);

        setRoiImage(roiImageData);
        setNonRoiImage(nonRoiImageData);
        setError(null);
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

    


      
 const fetchPatientName = async () => {
    try {
      const response = await fetch(`/api/fetchuser`);
      const data = await response.json();
      const patient = data.filter(user => user.email === userEmail);
      setPatientName(patient[0].firstName + " " + patient[0].lastName);
      console.log(patientName)
    } catch (error) {
      console.error("Error fetching patient name:", error);
    }
  }
if(patientName === null){
  fetchPatientName();
}


  








const handleSubmit = async (e) => {
  e.preventDefault();

   const formData = new FormData();
    formData.append("name", imageName);
    formData.append("description", imageDescription);
    formData.append("pathology", pathology);
    formData.append("doctorEmail", doctorEmail);
    formData.append("patientEmail",patientEmail);
    formData.append("image", imagePath);

    
  

  try {
    const response = await fetch('/api/upload-images', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error:', error);
  }
};

  const handleThresholdChange = (event) => {
    const newThreshold = parseInt(event.target.value, 10);
    setThreshold(newThreshold);
  };

  const clearImages = () => {
    setRoiImage(null);
    setNonRoiImage(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white p-5">
        <div className="flex items-center space-x-4">
          <Avatar>
            <img
              alt="Radhakrishnan"
              height="50"
              src="/placeholder.png"
              style={{
                aspectRatio: "50/50",
                objectFit: "cover",
              }}
              width="50"
            />
          </Avatar>
          <span className="font-semibold">{patientName}</span>
        </div>
        <ul className="mt-8 space-y-2">
          <li className="font-semibold text-blue-500">Dashboard</li>
          <li>Personal info</li>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main className="flex-1 p-8">
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-1">
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-sm text-gray-500">Current Doctor</div>
                {/* {//if no doctor is assigned, display "No doctor assigned" */}
                <div className="font-semibold">{currentDoctor ? currentDoctor : "No doctor assigned"}</div>



      
              </div>
              <Avatar>
                <img
                  alt="Dr John Doe"
                  height="50"
                  src="/placeholder.png"
                  style={{
                    aspectRatio: "50/50",
                    objectFit: "cover",
                  }}
                  width="50"
                />
              </Avatar>
            </div>
          </Card>
          <Card className="col-span-1">
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-sm text-gray-500">Reports uploaded</div>
                <div className="font-semibold">6</div>
              </div>
              <Button variant="ghost">View All</Button>
            </div>
          </Card>
          <br />
          <br />

          <div className="col-span-1 flex justify-end">
          <div className="mt-8">
            <form action="submit">

          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <Button variant="" onClick={handleSubmit} >Upload scan</Button>
          
            </form>
          <div>
            <label htmlFor="threshold" className="mr-2">
              Threshold:
            </label>
            <input
              type="number"
              id="threshold"
              min="0"
              max="255"
              value={threshold}
              onChange={handleThresholdChange}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="display-flex-row">

          {roiImage && (
            <>
            <h2 className="mt-4 text-xl font-semibold">Roi Image</h2>
            <canvas
              ref={(canvas) => {
                if (canvas) {
                  const ctx = canvas.getContext('2d');
                  ctx.putImageData(roiImage, 0, 0);
                }
              }}
              width={roiImage.width}
              height={roiImage.height}
            />
            </>
          )}
          
          {nonRoiImage && (
            <>
            <h2 className="mt-4 text-xl font-semibold">Non Roi Image</h2>
            <canvas
              ref={(canvas) => {
                if (canvas) {
                  const ctx = canvas.getContext('2d');
                  ctx.putImageData(nonRoiImage, 0, 0);
                }
              }}
              width={nonRoiImage.width}
              height={nonRoiImage.height}
            />
            </>
          )}
          </div>
        </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recently uploaded</h2>
            <Button variant="ghost">View all</Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Date in</TableHead>
                  <TableHead>Diagnostic</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Brain scan</TableCell>
                  <TableCell>Dec 18, 2021</TableCell>
                  <TableCell>Brain tumour</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Chest scan</TableCell>
                  <TableCell>Dec 18, 2021</TableCell>
                  <TableCell>Pancreatic Cancer</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Thoraxical Scan</TableCell>
                  <TableCell>Dec 18, 2021</TableCell>
                  <TableCell>Contraceptives</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Abdomen</TableCell>
                  <TableCell>Dec 18, 2021</TableCell>
                  <TableCell>Tuberculosis</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          {/* input filed to select doctors from database and abiltiy to select them */}
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
                onKeyUp={fetchAllDoctors}
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

        </div>
      </main>
    </div>
  )
}

