import upload from '../../lib/multer';
import { dbConnect } from '@/lib/db';
import User from '@/models/user';
import Image from "@/models/images"
import { getAuth } from '@clerk/nextjs/server';
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { method } = req;
  const session = await getAuth(req);

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const uploadedFile = await upload.single('image')(req, res);

        if (!uploadedFile) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        const user = await User.findOne({ clerkId: session.userId });

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Create a new Image document
        const image = new Image({
          url: uploadedFile.file.location,
          [user.role]: user.clerkId, // Associate the image with the user based on their role
        });

        // If the user is a patient or lab staff, associate the image with the doctor
        if (user.role === 'patient' || user.role === 'lab-staff') {
          if (!user.doctor) {
            return res.status(400).json({ error: 'No doctor associated with the user' });
          }

          const doctor = await User.findOne({ clerkId: user.doctor });
          image.doctor = doctor.clerkId;
        }

        await image.save();

        return res.status(200).json({ message: 'File uploaded successfully', image });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error uploading file' });
      }
    default:
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}