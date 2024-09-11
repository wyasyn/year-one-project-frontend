import {
  CalendarClock,
  ChevronLeft,
  HomeIcon,
  Info,
  PlusIcon,
} from "lucide-react";
import NavItem from "./nav-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const links = [
  {
    name: "home",
    link: "/admin",
    icon: <HomeIcon size={18} />,
  },
  {
    name: "Query",
    link: "/admin/add-query",
    icon: <PlusIcon size={18} />,
  },
  {
    name: "Events",
    link: "/admin/events",
    icon: <CalendarClock size={18} />,
  },
  {
    name: "Info",
    link: "/admin/important-info",
    icon: <Info size={18} />,
  },
];
export default function AdminNavbar() {
  return (
    <header>
      <nav className=" py-8 flex flex-col md:min-w-[200px] border-r h-screen">
        <ul className="flex flex-col gap-5 flex-1">
          {links.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </ul>

        <Link href="/">
          <Button
            size="sm"
            variant="ghost"
            className="mt-auto w-full flex items-center gap-4"
          >
            <ChevronLeft />
            <span className=" hidden md:block ">Main Page</span>
          </Button>
        </Link>
      </nav>
    </header>
  );
}
