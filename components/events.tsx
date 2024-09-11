import Link from "next/link";
import UpcomingEvent from "./upcomingEvent";
import { Button } from "./ui/button";
import SubTitle from "./sub-title";

export default function Events() {
  return (
    <div className=" hidden lg:left-[5%] xl:left-[8%] 2xl:left-[10%] fixed top-[3.3rem] w-full lg:flex flex-col gap-8 max-w-[200px] xl:max-w-[250px] py-6  border-r items-center xl:items-start pb-[5rem] min-h-[93vh] ">
      <SubTitle title="Upcoming Events 🎉" />
      <UpcomingEvent />
      <UpcomingEvent />
      <UpcomingEvent />
      <UpcomingEvent />
      <Link href="/upcoming" className="mt-12">
        <Button size="sm" variant="outline">
          See more
        </Button>
      </Link>
    </div>
  );
}
