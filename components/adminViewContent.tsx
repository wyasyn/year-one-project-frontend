"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const apiUri = process.env.NEXT_PUBLIC_URI;

// Define the type for a question-answer pair
interface QA {
  id: number;
  question: string;
  answer: string;
}

const ViewQAs: React.FC = () => {
  const { toast } = useToast();
  const [qas, setQAs] = useState<QA[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchQAs = async () => {
    try {
      const res = await axios.get(`${apiUri}/qa`); // Adjust this URL as per your backend route
      setQAs(res.data); // Assuming the response is an array of QAs
    } catch (error) {
      console.error("Error fetching QAs:", error);
    }
  };

  // Fetch the list of QAs from the backend
  useEffect(() => {
    fetchQAs();
  }, [qas]);

  const handleDelete = async (id: number) => {
    try {
      setLoading(true); // Show loading spinner before sending request
      const res = await axios.delete(`${apiUri}/qa/${id}`);
      if (res.status === 200) {
        toast({
          variant: "default",
          title: "Success",
          description: "QA deleted successfully!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error occurred",
        });
      }
      fetchQAs(); // Refresh the list of QAs after deletion
    } catch (error) {
      console.log("An error occurred");
    } finally {
      setLoading(false); // Hide loading spinner after request finishes
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 pb-12 pt-8 border mt-[5rem] rounded-lg">
      <h2 className="text-2xl mb-4 text-foreground">Q&A List</h2>

      {!qas ? (
        <p>Could not connect to the backend</p>
      ) : qas && qas.length === 0 ? (
        <p>No Q&A found</p>
      ) : (
        <Accordion type="single" collapsible>
          {qas.map((qa) => (
            <AccordionItem key={qa.id} value={`item-${qa.id}`}>
              <AccordionTrigger>{qa.question}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3">
                  <p>{qa.answer}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-fit ml-auto"
                    disabled={loading}
                    onClick={() => {
                      handleDelete(qa.id);
                    }}
                  >
                    Delete
                    <span className="sr-only"> {qa.question}</span>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default ViewQAs;
