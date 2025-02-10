import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Toaster } from "@/components/ui/toaster"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64 flex-grow">
        <Header />
        <main className="flex-1 p-6 bg-gray-50">
          {children}
          <Toaster/>
        </main>
      </div>
    </div>
  )
}