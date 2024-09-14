"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
const apiUri = process.env.NEXT_PUBLIC_URI;

export default function AddCommunication() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const communicationData = {
      title,
      message,
    };

    try {
      const res = await axios.post(
        `${apiUri}/communications`,
        communicationData
      );
      if (res.status === 201) {
        toast({
          variant: "default",
          title: "Success",
          description: "Communication added successfully!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add communication.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add communication.",
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
          className="min-h-32"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button disabled={loading} size="sm">
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Create Communication"
        )}
      </Button>
    </form>
  );
}
