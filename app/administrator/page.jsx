"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { NextResponse } from "next/server"


export default function adminpage() {
    const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
    const [showLabStaffForm,setShowLabStaffForm] =useState(false);
    const [doctors, setDoctors] = useState([]);
    const [labstaff,setLabstaff]=useState([]);
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");
    const [hospital,setHospital]=useState("");
    const [currentDoctor,setCurrentDoctor]=useState({});
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
      const userData = {
        clerkId: "user" + Math.floor(Math.random() * 1000000),
        firstName,
        lastName,
        email: email,
        username: username,
        password: password,
        role,
        hospital: role === 'doctor' ? hospital : '',
        currentDoctor:role=='patient'?currentDoctor:''
      
      };

      // Send the user data to the server
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle successful registration
        console.log('User registered successfully');
        setShowAddDoctorForm(false);
       
      } else {
        // Handle registration error
        console.error('Error registering user:', response.statusText);
      }
    }
   catch (err) {
      console.error('Error registering user:', err);
  }
};


    const handleAddDoctorClick = () => {
      setShowAddDoctorForm(true);
      setRole("doctor")
    };
    const handleAddLabstaffClick=()=>{
        setShowLabStaffForm(true);
        setRole("labstaff")
    }
    //delete user from database with given email
    const handleDeleteUser= async(emailAddress)=>{
      try{
      const response = await fetch(`/api/fetchuser/${emailAddress}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
       
        console.log('User deleted successfully');

      } else {
        // Handle error
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }

      
    }
    const fetchDoctors = () => {
      fetch(`/api/fetchuser`,{method: 'GET', headers: { 'Content-Type': 'application/json' }})
         .then(response => {
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
           return response.json();
         })
         .then(data => {
           console.log('Response:', data); 
           // Log response data
           data=data.filter(user=>user.role==="doctor");
           setDoctors(data);
           setShowAddDoctorForm(false);
         })
         .catch(error => {
           console.error('Error fetching doctors:', error);
         });
     };
     
    
    useEffect(() => {
      fetchDoctors();
    }, []);
  
  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-[280px_1fr] bg-gray-100 dark:bg-gray-950">
        <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" href="#">
                <Package2Icon className="h-6 w-6" />
                <span className="">MED VAULT</span>
              </Link>
              <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                <BellIcon className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  href="#"
                >
                  <UsersIcon className="h-4 w-4" />
                  Doctors
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <DogIcon className="h-4 w-4" />
                  Lab Staff
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <UsersIcon className="h-4 w-4" />
                  Patients
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
            <Link className="lg:hidden" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="sr-only">Home</span>
            </Link>
            <div className="flex-1">
              <form>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                    placeholder="Search doctors or lab staff..."
                    type="search"
                  />
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800 dark:border-gray-800"
                  size="icon"
                  variant="ghost"
                >
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border shadow-sm rounded-lg">
                <div className="flex items-center justify-between border-b px-6 py-4">
                  <h2 className="text-lg font-semibold">Doctors</h2>
                  <div className="flex items-center gap-2">
                    {/* show form only when button is clicked */}
                    <Button size="sm" onClick={handleAddDoctorClick} color="primary" >
                      <PlusIcon className="mr-2 = h-4 w-4" />
                      Add Doctor
                    </Button>
                    <Button size="sm" variant="outline">
                      <Link href="#">
                        View All
                      </Link>
                    </Button>
                  </div>
                </div>
                <Table className="min-w-full">
  <TableHeader>
    <TableRow>
      <TableHead className="px-4 py-2">Name</TableHead>
      <TableHead className="px-4 py-2">Hospital</TableHead>
      <TableHead className="px-4 py-2">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {doctors.map((user) => (
      <TableRow key={user.email} className="border-b">
        <TableCell className="px-4 py-2">{user.firstName} {user.lastName}</TableCell>
        <TableCell className="px-4 py-2">{user.hospital}</TableCell>
        <TableCell className="px-4 py-2">
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost">
              <EyeIcon className="h-4 w-4" />
              <span className="sr-only">View</span>
            </Button>
            <Button size="icon" variant="ghost" onClick={()=>handleDeleteUser(user.email)}>
              <TrashIcon className="h-4 w-4"  />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
              </div>
              <div className="border shadow-sm rounded-lg">
                <div className="flex items-center justify-between border-b px-6 py-4">
                  <h2 className="text-lg font-semibold">Lab Staff</h2>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={handleAddLabstaffClick}>
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Lab Staff
                    </Button>
                    <Button size="sm" variant="outline">
                      <Link href="#">
                      
                        View All
                      </Link>
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Sarah Johnson</TableCell>
                      <TableCell>Lab Technician</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button size="icon" variant="ghost">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">David Lee</TableCell>
                      <TableCell>Lab Manager</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button size="icon" variant="ghost">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Emily Chen</TableCell>
                      <TableCell>Lab Technician</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button size="icon" variant="ghost">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </main>
        </div>
      </div>
      
          {/* render based on the button click */}
        {showAddDoctorForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter first name" onChange={(e)=>setFirstName(e.target.value)}  />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter last name"  onChange={(e)=>setLastName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter email" type="email" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Enter password" type="password" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="hostpital">Hospital</Label>
                  <Input id="hostpital" placeholder="Enter hospital name" type="text" onChange={(e)=>setHospital(e.target.value)}/>
                </div>

               
                <div className="flex justify-end">
                    <Button className="mr-2" variant="outlin" onClick={(e)=>setShowAddDoctorForm(false)}>
                        Cancel
                    </Button>
                
                    <Button type="submit">Save</Button>
                </div>
            </form>
            </div>
      </div>
        )}
        {showLabStaffForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-2xl font-bold mb-4">Add Lab Staff</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter first name" />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter last name" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter email" type="email" />
                </div>
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Enter password" type="password" />
                </div>
                <div className="flex justify-end">
                    <Button className="mr-2" variant="outlin" onClick={(e)=>setShowLabStaffForm(false)}>
                        Cancel
                    </Button>
                    <Button>Save</Button>
                </div>
            </form>
            </div>
      </div>
        )}
          
          
       
    </>
  )
}


function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function DogIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
      <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
    </svg>
  )
}


function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
