import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" p-8 ">
      <nav>
        <ul className=" flex items-center gap-12 ">
          <li>
            <Link
              className="hover:text-foreground duration-300 ease-in-out"
              href="/admin/communication"
            >
              All
            </Link>
          </li>

          <li>
            <Link
              className="hover:text-foreground duration-300 ease-in-out"
              href="/admin/communication/add"
            >
              Add
            </Link>
          </li>
        </ul>
      </nav>
      <section>{children}</section>
    </main>
  );
}
