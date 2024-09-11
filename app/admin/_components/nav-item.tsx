"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({
  link,
  name,
  icon,
}: {
  link: string;
  name: string;
  icon: React.ReactElement;
}) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={link}
        className={`flex items-center px-3 py-2 hover:bg-secondary/40 duration-300 ease-in-out ${
          pathname === link
            ? "bg-secondary/50 text-foreground"
            : "bg-background"
        }  relative flex gap-3 capitalize`}
      >
        {pathname === link && (
          <div className=" absolute left-0 top-0 bottom-0 w-[2px] bg-foreground h-full" />
        )}

        {icon}
        <span className="hidden md:block">{name}</span>
      </Link>
    </li>
  );
}
