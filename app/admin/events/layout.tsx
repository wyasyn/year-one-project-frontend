import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" px-4 py-[3rem] ">
      <nav className=" mb-8 ">
        <ul className=" flex gap-4 ">
          <li>
            <Link
              className="hover:text-foreground duration-300 ease-in-out"
              href="/admin/events"
            >
              All events
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-foreground duration-300 ease-in-out"
              href="/admin/events/add-event"
            >
              Add Event
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
