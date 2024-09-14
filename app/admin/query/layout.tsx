import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" p-8 ">
      <nav>
        <ul className=" flex items-center gap-8  ">
          <li>
            <Link
              className=" hover:text-foreground duration-300 ease-in-out "
              href="/admin/query"
            >
              All queries
            </Link>
          </li>
          <li>
            <Link
              className=" hover:text-foreground duration-300 ease-in-out "
              href="/admin/query/add"
            >
              Add query
            </Link>
          </li>
        </ul>
      </nav>
      <section>{children}</section>
    </main>
  );
}
