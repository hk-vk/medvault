
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from "next/link"

export default function patientlist() {
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6">
      <div className="my-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Patient List</h1>
          <Button variant="outline">Add Patient</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage alt="John Doe" src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Patient</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage alt="Dr. Jane Smith" src="/placeholder-user.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="font-medium">Dr. Jane Smith</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Cardiologist</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Link className="text-blue-600 hover:underline" href="#">
                  john.doe@example.com
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage alt="Jane Smith" src="/placeholder-user.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Patient</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage alt="Dr. John Doe" src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="font-medium">Dr. John Doe</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Pediatrician</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Link className="text-blue-600 hover:underline" href="#">
                  jane.smith@example.com
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage alt="Michael Johnson" src="/placeholder-user.jpg" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="font-medium">Michael Johnson</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Patient</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage alt="Dr. Sarah Lee" src="/placeholder-user.jpg" />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="font-medium">Dr. Sarah Lee</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Oncologist</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Link className="text-blue-600 hover:underline" href="#">
                  michael.johnson@example.com
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
