import { Link } from "react-router-dom";
import { Badge, Button, Card } from "@/components/ui";
import { StarRating } from "@/components/common/StarRating";
import { formatPrice } from "@/utils/formatPrice";
import { truncate } from "@/utils/truncate";
import { BookOpen, Users } from "lucide-react";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='480' viewBox='0 0 800 480'%3E%3Crect width='800' height='480' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='28' fill='%2394a3b8'%3ECoursify%3C/text%3E%3C/svg%3E";

export function CourseCard({ course, href, actionLabel = "View Course", onAction }) {
  const price = course.discountPrice && course.discountPrice > 0 ? course.discountPrice : course.price;
  const hasDiscount = course.discountPrice && course.discountPrice > 0 && course.discountPrice < course.price;

  return (
    <Card className="group overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={course.thumbnailUrl || PLACEHOLDER}
          alt={course.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {course.level ? <Badge variant="secondary">{course.level}</Badge> : null}
          {course.isPublished ? <Badge variant="success">Published</Badge> : <Badge variant="outline">Draft</Badge>}
        </div>
      </div>
      <div className="flex h-full flex-col gap-4 p-5">
        <div>
          <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">{course.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{truncate(course.shortDescription || course.description, 110)}</p>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
          <span>{course.instructor?.name || course.instructorName || "Coursify Instructor"}</span>
          <span className="flex items-center gap-1">
            <StarRating value={course.ratingAvg || course.rating || 0} />
            <span>{Number(course.ratingAvg || course.rating || 0).toFixed(1)}</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {course.lessonCount || course.lessonsCount || course.sections?.length || 0} lessons
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.enrollmentCount || 0}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">{formatPrice(price)}</span>
              {hasDiscount ? (
                <span className="text-sm text-slate-400 line-through">{formatPrice(course.price)}</span>
              ) : null}
            </div>
          </div>
          {href ? (
            <Button asChild>
              <Link to={href}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
        </div>
      </div>
    </Card>
  );
}
