"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { FolderCog } from "lucide-react";
import DeleteCommunication from "./delete-comm";
const apiUri = process.env.NEXT_PUBLIC_URI;

interface ImportantCommunication {
  id: number;
  title: string;
  message: string;
  date_posted: string;
}

export default function ViewAllCommunications() {
  const { toast } = useToast();
  const [communications, setCommunications] = useState([]);

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        const res = await axios.get(`${apiUri}/communications`);
        setCommunications(res.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch communications.",
        });
      }
    };

    fetchCommunications();
  }, []);

  return (
    <div className=" mx-auto mt-[5rem] grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {communications.length ? (
        communications.map((comm: ImportantCommunication) => (
          <Card key={comm.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-4 justify-between">
                {comm.title}{" "}
                <Link href={`/admin/communication/detail/${comm.id}`}>
                  <FolderCog size={20} />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>{comm.message}</CardContent>
            <CardFooter>
              Posted on:{" "}
              {new Date(comm.date_posted).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              <DeleteCommunication communicationId={comm.id} />
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No communications found.</p>
      )}
    </div>
  );
}
