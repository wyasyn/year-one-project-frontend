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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
const apiUri = process.env.NEXT_PUBLIC_URI;

export default function AddUpcomingEvent() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Create event data object
    const eventData = {
      title,
      event_date: date,
      description,
    };

    try {
      const res = await axios.post(`${apiUri}/events`, eventData);
      if (res.status === 201) {
        toast({
          variant: "default",
          title: "Success",
          description: "Event added successfully!",
        });
        setTitle(""); // Clear the input fields after success
        setDate(new Date());
        setDescription("");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add Event.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add Event.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-[5rem]">
      <CardHeader>
        <CardTitle>Add New Event</CardTitle>
        <CardDescription>Create an upcoming event</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              className="w-full"
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
              className="min-h-32"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button disabled={loading} size="sm">
            {loading ? <Loader2 className="animate-spin" /> : "Create Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
