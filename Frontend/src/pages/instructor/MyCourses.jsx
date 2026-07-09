import { Link } from "react-router-dom";
import { useInstructorCourses } from "@/hooks/useCourses";
import { Button, Card, Badge } from "@/components/ui";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";

export function MyCourses() {
  const coursesQuery = useInstructorCourses({ limit: 50 });

  if (coursesQuery.isLoading) return <LoadingSpinner />;
  if (coursesQuery.isError) return <ErrorState description="We could not load your courses." onRetry={() => coursesQuery.refetch()} />;

  const courses = coursesQuery.data?.data || coursesQuery.data || [];

  return (
    <div className="space-y-6">
      <Card className="flex items-center justify-between gap-4 p-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950">My Courses</h1>
          <p className="mt-2 text-slate-600">Create, edit, and publish courses.</p>
        </div>
        <Button asChild>
          <Link to="/instructor/courses/new">New course</Link>
        </Button>
      </Card>

      {courses.length === 0 ? (
        <EmptyState title="No courses yet" description="Create your first course from the editor." />
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course._id} className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{course.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{course.shortDescription || course.description}</p>
                  <p className="mt-2 text-sm text-slate-500">Updated {formatDate(course.updatedAt)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={course.isPublished ? "success" : "secondary"}>{course.isPublished ? "Published" : "Draft"}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                  <span className="text-sm text-slate-500">{formatPrice(course.discountPrice || course.price)}</span>
                  <Button asChild variant="outline">
                    <Link to={`/instructor/courses/${course._id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
