"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
const apiUri = process.env.NEXT_PUBLIC_URI;

export default function EditCommunication({
  communicationId,
}: {
  communicationId: number;
}) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCommunication = async () => {
      try {
        const res = await axios.get(
          `${apiUri}/communications/${communicationId}`
        );
        const { title, message } = res.data;
        setTitle(title);
        setMessage(message);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch communication.",
        });
      }
    };

    fetchCommunication();
  }, [communicationId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const communicationData = {
      title,
      message,
    };

    try {
      const res = await axios.put(
        `${apiUri}/communications/${communicationId}`,
        communicationData
      );
      if (res.status === 200) {
        toast({
          variant: "default",
          title: "Success",
          description: "Communication updated successfully!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update communication.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update communication.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 max-w-lg mx-auto mt-[5rem]"
    >
      <div className="grid gap-3">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          type="text"
          className="w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the subject"
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Enter the communication message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button disabled={loading} size="sm">
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Update Communication"
        )}
      </Button>
    </form>
  );
}
