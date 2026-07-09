import { Button, Card } from "@/components/ui";
import { TriangleAlert } from "lucide-react";

export function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <Card className="border-red-200 bg-red-50/60">
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <TriangleAlert className="h-10 w-10 text-red-600" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{description || "Please try again in a moment."}</p>
        </div>
        {onRetry ? (
          <Button variant="destructive" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
