"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const apiUri = process.env.NEXT_PUBLIC_URI;

export default function DeleteCommunication({
  communicationId,
}: {
  communicationId: number;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${apiUri}/communications/${communicationId}`
      );
      if (res.status === 200) {
        toast({
          variant: "default",
          title: "Success",
          description: "Communication deleted successfully!",
        });
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete communication.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete communication.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      variant="destructive"
      size="sm"
      className="ml-auto"
    >
      {loading ? <Loader2 className="animate-spin" /> : <Trash2 size={20} />}
    </Button>
  );
}
