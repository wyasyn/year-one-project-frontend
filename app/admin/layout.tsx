import AdminNavbar from "./_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-start">
      <AdminNavbar />
      <div className=" flex-1 min-h-screen">{children}</div>
    </main>
  );
}
