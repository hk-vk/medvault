

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-white">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">The Platform
            
            </h2>
            <br />
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Revolutionizing healthcare management with secure, efficient handling of medical imaging and health data, enabling streamlined access, role-based permissions, and timely diagnostic support.                                                
                                                                                                                                                              

            </p>
            <br />
            <br />
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-5">
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Comprehensive Medical Image Management</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            Streamline the secure management of medical imaging and health data.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Secure Data Handling</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            Implement robust security measures to protect against unauthorized access.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Role-Based Access Control</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            Grant access levels tailored to the roles of doctors, patients, lab staff, and administrators.

            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Efficient Medical Image Storage</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              lossless compresssion of medical images for efficient storage
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Timely Diagnostic Support</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            Provide doctors with a consolidated view of patient imaging and health data.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
