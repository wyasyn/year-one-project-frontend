"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({
  link,
  name,
  icon,
  exact = false, // New prop to check if it needs an exact match
}: {
  link: string;
  name: string;
  icon: React.ReactElement;
  exact?: boolean;
}) {
  const pathname = usePathname();
  // Check if it requires an exact match or can use startsWith
  const isActive = exact ? pathname === link : pathname.startsWith(link);

  return (
    <li>
      <Link
        href={link}
        className={`flex items-center px-3 py-2 hover:bg-secondary/40 duration-300 ease-in-out ${
          isActive ? "bg-secondary/50 text-foreground" : "bg-background"
        }  relative flex gap-3 capitalize`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-foreground h-full" />
        )}

        {icon}
        <span className="hidden md:block">{name}</span>
      </Link>
    </li>
  );
}
