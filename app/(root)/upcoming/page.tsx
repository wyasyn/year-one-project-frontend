import SubTitle from "@/components/sub-title";
import UpcomingEvent from "@/components/upcomingEvent";

export default function page() {
  return (
    <main className="container mt-[3.2rem] py-12 min-h-[90vh] flex flex-col">
      <SubTitle title="Upcoming Events 🎉" />
      <div className="pt-12 grid gap-6 custom-grid">
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
      </div>
      <footer className=" mt-auto text-sm ">
        <p>© {new Date().getFullYear()}. Success begins at Cavendish</p>
      </footer>
    </main>
  );
}
