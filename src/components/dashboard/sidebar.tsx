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
    <div className="lg:w-64 w-52 fixed bg-black text-white border-primYellow border-r h-screen p-4">
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

// import Link from 'next/link';
// import { Users, LayoutGrid, ShoppingCart, LogOut } from 'lucide-react';

// export function Sidebar() {
//   const navigation = [
//     { name: 'Dashboard', href: '/dashboard', icon: <LayoutGrid /> },
//     { name: 'Customers', href: '/dashboard/customers', icon: <Users /> },
//     { name: 'Orders', href: '/dashboard/orders', icon: <ShoppingCart /> },
//   ];

//   return (
//     <div className="fixed  w-64 bg-black text-white border-r border-primaryYellow">
//       <div className="p-4 mb-8">
//         <h1 className="text-2xl font-bold">Food <span className="text-primaryYellow">Tuck</span></h1>
//       </div>
      
//       <nav className="space-y-2 px-4">
//         {navigation.map((item) => (
//           <Link 
//             key={item.name} 
//             href={item.href} 
//             className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg transition"
//           >
//             <span className="text-primaryYellow w-5 h-5">{item.icon}</span>
//             <span>{item.name}</span>
//           </Link>
//         ))}
        
//         <div className="absolute bottom-0 left-0 right-0 p-4">
//           <Link 
//             href="/logout" 
//             className="flex items-center gap-3 p-2 hover:bg-red-800 rounded-lg transition"
//           >
//             <LogOut className="text-red-500 w-5 h-5" />
//             <span>Logout</span>
//           </Link>
//         </div>
//       </nav>
//     </div>
//   );
// };
