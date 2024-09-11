"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const apiUri = process.env.NEXT_PUBLIC_URI;
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

export default function EditUpcomingEvent() {
  const params = useParams<{ id: string }>();
  const eventId = parseInt(params.id);
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${apiUri}/events/${eventId}`);
        const { title, event_date, description } = res.data;
        setTitle(title);
        setDate(new Date(event_date));
        setDescription(description);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch event.",
        });
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const eventData = {
      title,
      event_date: date,
      description,
    };

    try {
      const res = await axios.put(`${apiUri}/events/${eventId}`, eventData);
      if (res.status === 200) {
        toast({
          variant: "default",
          title: "Success",
          description: "Event updated successfully!",
        });
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update event.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update event.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-[5rem]">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
        <CardDescription>Modify the upcoming event</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the event title"
              required
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => setDate(day || new Date())}
                disabled={(date) => date < new Date()}
                initialFocus
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter the event description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button disabled={loading} size="sm">
            {loading ? <Loader2 className="animate-spin" /> : "Update Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
