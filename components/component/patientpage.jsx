"use client"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useState } from "react"
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

export default function PatientPage() {
  const [roiImage, setRoiImage] = useState(null);
  const [nonRoiImage, setNonRoiImage] = useState(null);
  const [threshold, setThreshold] = useState(128);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [doctorName,setDoctorName]=useState('');

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
          <span className="font-semibold">Radhakrishnan</span>
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
                <div className="font-semibold">Dr John Doe</div>
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
          <input type="file" accept="image/*" onChange={handleImageUpload} />
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
        </div>
      </main>
    </div>
  )
}
