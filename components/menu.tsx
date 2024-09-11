import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignCenter, User } from "lucide-react";
import Link from "next/link";
import ModeToggler from "./modeToggler";

export default function DropMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AlignCenter />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/admin" className="flex items-center gap-3">
            <User /> Admin
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ModeToggler />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
