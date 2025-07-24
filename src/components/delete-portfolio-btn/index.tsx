"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeletePortfolioButton({
  portfolioId,
}: {
  portfolioId: number;
}) {
  const router = useRouter();

  async function handleDelete() {
    try {
      const response = await fetch(`/api/portfolios/${portfolioId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      toast.success("Portfolio deleted successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete Portfolio
    </Button>
  );
}
