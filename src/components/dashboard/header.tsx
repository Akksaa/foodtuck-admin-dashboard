import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="h-16 border-b bg-black text-white px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center gap-3">
        <input
          type="search"
          placeholder="Search..."
          className="bg-black px-4 py-1 rounded-full placeholder:text-white text-white text-sm border border-primYellow focus:outline-none focus:ring-0"
        />
        <Search className="w-5 h-5 text-primYellow" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button className="hover:bg-primYellow bg-black group" size="icon">
          <Bell className="w-5 h-5 text-primYellow group-hover:text-white" />
        </Button>
        <Button className="hover:bg-primYellow bg-black group" size="icon">
          <Link href={"../dashboard/admin/info"}>
            {" "}
            <User className="w-5 h-5 text-primYellow group-hover:text-white" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
