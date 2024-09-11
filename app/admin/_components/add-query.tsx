"use client";
import React, { useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const apiUri = process.env.NEXT_PUBLIC_URI;

export default function AddQuery() {
  const { toast } = useToast();
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true); // Show loading spinner before sending request

      // Send question and answer to the backend
      const res = await axios.post(`${apiUri}/learn`, {
        question,
        answer,
      });

      if (res.status === 200) {
        toast({
          variant: "default",
          title: "Success",
          description: "Question and Answer added successfully!",
        });
        setQuestion(""); // Clear the input fields after success
        setAnswer("");
      } else {
        toast({
          variant: "destructive",
          title: "Success",
          description: "Failed to add QA.",
        });
      }
    } catch (error) {
      console.error("Error adding QA:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add QA.",
      });
    } finally {
      setLoading(false); // Hide loading spinner after request finishes
    }
  };
  return (
    <Card className="max-w-lg mx-auto mt-[5rem]">
      <CardHeader>
        <CardTitle>Add New Q&A</CardTitle>
        <CardDescription>
          Train the bot for new questions and answer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              type="text"
              className="w-full"
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the question"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              placeholder="Enter the answer"
              required
              className="min-h-32"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <Button disabled={loading} size="sm">
            {loading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
