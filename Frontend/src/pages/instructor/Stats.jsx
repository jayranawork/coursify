import { useInstructorStats } from "@/hooks/useDashboard";
import { Card } from "@/components/ui";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { formatPrice } from "@/utils/formatPrice";

export function Stats() {
  const statsQuery = useInstructorStats();
  if (statsQuery.isLoading) return <LoadingSpinner />;
  if (statsQuery.isError) return <ErrorState description="We could not load stats." onRetry={() => statsQuery.refetch()} />;
  const stats = statsQuery.data || {};
  const items = [
    ["Total courses", stats.totalCourses || 0],
    ["Total students", stats.totalStudents || 0],
    ["Revenue", formatPrice(stats.revenue || 0)],
    ["Average rating", (stats.ratingAvg || 0).toFixed(1)],
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map(([label, value]) => (
        <Card key={label} className="p-6">
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
        </Card>
      ))}
    </div>
  );
}
