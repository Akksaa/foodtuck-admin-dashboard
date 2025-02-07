import Link from "next/link"
import { 
  Home, 
  Package, 
  Users, 
  ShoppingCart 
} from "lucide-react"

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
]

export function Sidebar() {
  return (
    <div className="lg:w-64 w-52 bg-black text-white border-primYellow border-r min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Food<span className="text-primYellow">Tuck</span></h1>
      </div>
      
      <nav className="space-y-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-2 px-2 py-2 text-sm rounded-lg hover:opacity-70 transition-opacity border-b border-primYellow"
          >
            <item.icon className="w-5 h-5 text-primYellow" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}