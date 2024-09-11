import Activities from "@/components/activities";
import StudentChat from "@/components/chart";
import Events from "@/components/events";

export default function page() {
  return (
    <main className="mt-[3.2rem] flex align-top container min-h-[90vh]">
      <Events />
      <StudentChat />
      <Activities />
    </main>
  );
}
