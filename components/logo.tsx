import { Bot } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Bot className="group-hover:rotate-45 duration-300 ease-in-out" />{" "}
      <span className="text-foreground text-lg py-3">CampusBot</span>
    </Link>
  );
}
