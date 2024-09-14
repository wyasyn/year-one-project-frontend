import axios from "axios";
import { Calendar, FolderCog } from "lucide-react";
import Link from "next/link";
import DeleteUpcomingEvent from "../_components/delete-event";
const apiUri = process.env.NEXT_PUBLIC_URI;

interface EventProps {
  id: number;
  title: string;
  description: string;
  event_date: string;
}

export default async function Event() {
  const res = await axios(`${apiUri}/events`);
  const events = res.data;

  return (
    <div className=" flex gap-6 flex-wrap ">
      {events.length === 0 ? (
        <p>No events to show</p>
      ) : (
        events.map((event: EventProps) => (
          <div
            key={event.id}
            className=" border p-3 rounded-lg max-w-[250px] flex flex-col "
          >
            <h2 className=" text-foreground truncate flex items-center justify-between gap-4 ">
              {event.title}{" "}
              <Link href={`/admin/events/detail/${event.id}`}>
                <FolderCog size={20} />
              </Link>
            </h2>
            <p className=" text-sm py-3">
              {event.description.length > 70
                ? `${event.description.substring(0, 70)}...`
                : event.description}
            </p>
            <p className=" text-sm flex gap-3 mt-auto items-center ">
              <Calendar size={16} /> {event.event_date}{" "}
              <DeleteUpcomingEvent eventId={event.id} />
            </p>
          </div>
        ))
      )}
    </div>
  );
}
