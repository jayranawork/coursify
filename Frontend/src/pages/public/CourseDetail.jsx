import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BookOpen,
  Check,
  CirclePlay,
  Heart,
  Lock,
  Play,
  FileText,
  Video,
  ListVideo,
  MessageSquareMore,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useCourseDetail, useCourseReviews, useToggleWishlist, useWishlist } from "@/hooks/useCourses";
import { useEnrollments } from "@/hooks/useEnrollments";
import { Button, Badge, Card, Input, Textarea, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { StarRating } from "@/components/common/StarRating";
import { formatPrice } from "@/utils/formatPrice";
import { groupLessonsBySection, isCourseInWishlist, isEnrollmentForCourse, normalizeId } from "@/utils/courseUtils";
import { toast } from "sonner";
import { courseApi } from "@/services/api";

const reviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  title: z.string().max(180).optional(),
  comment: z.string().max(2000).optional(),
});

export function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const [tab, setTab] = useState("overview");
  const courseQuery = useCourseDetail(slug);
  const course = courseQuery.data?.course;
  const sections = courseQuery.data?.sections || [];
  const lessons = courseQuery.data?.lessons || [];
  const courseId = course?._id;
  const isStudent = user?.role === "student";
  const enrollmentsQuery = useEnrollments(Boolean(isStudent && accessToken));
  const wishlistQuery = useWishlist(Boolean(isStudent && accessToken));
  const toggleWishlist = useToggleWishlist();
  const reviewsQuery = useCourseReviews(courseId, { page: 1, limit: 5 });
  const reviewForm = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5, title: "", comment: "" },
  });

  const enrollments = enrollmentsQuery.data || [];
  const isEnrolled = isEnrollmentForCourse(enrollments, courseId);
  const wishlistItems = wishlistQuery.data || [];
  const liked = isCourseInWishlist(wishlistItems, courseId);
  const lessonsBySection = useMemo(() => groupLessonsBySection(lessons), [lessons]);
  const goToCourse = () => navigate(`/student/courses/${courseId}/learn`);
  const goToCheckout = () => navigate("/checkout", { state: { courses: [course] } });

  useEffect(() => {
    if (courseQuery.data && !courseQuery.isLoading) {
      setTab("overview");
    }
  }, [courseQuery.data, courseQuery.isLoading]);

  if (courseQuery.isLoading) return <LoadingSpinner />;
  if (courseQuery.isError) {
    return <ErrorState description="We could not load the course right now." onRetry={() => courseQuery.refetch()} />;
  }
  if (!course) {
    return <EmptyState title="Course not found" description="The course you requested does not exist or is not published." />;
  }

  const onWishlist = async () => {
    if (!isStudent) return;
    try {
      await toggleWishlist.mutateAsync({ courseId, liked });
      toast.success(liked ? "Removed from wishlist" : "Added to wishlist");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update wishlist");
    }
  };

  const submitReview = reviewForm.handleSubmit(async (values) => {
    try {
      await courseApi.createReview(courseId, values);
      toast.success("Review submitted");
      reviewForm.reset();
      reviewsQuery.refetch();
    } catch {
      toast.error("Unable to submit review");
    }
  });

  return (
    <div className="page-shell py-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <Badge variant="secondary">{course.level}</Badge>
          <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">{course.title}</h1>
          <p className="max-w-3xl text-base leading-7 text-slate-600">{course.shortDescription || course.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <StarRating value={course.ratingAvg || 0} />
              {Number(course.ratingAvg || 0).toFixed(1)} ({course.ratingCount || 0})
            </span>
            <span>{course.instructor?.name || course.instructorName || "Coursify Instructor"}</span>
            <span>{course.enrollmentCount || 0} enrolled</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {isEnrolled ? (
              <Button onClick={goToCourse}>
                <Play className="h-4 w-4" />
                Go to Course
              </Button>
            ) : (
              <Button onClick={goToCheckout}>
                <BookOpen className="h-4 w-4" />
                Proceed to Checkout
              </Button>
            )}
            <Button variant="outline" onClick={onWishlist} disabled={!isStudent}>
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              {liked ? "Saved" : "Wishlist"}
            </Button>
            <div className="text-2xl font-bold text-slate-950">{formatPrice(course.discountPrice || course.price)}</div>
          </div>
        </div>

        <Card className="overflow-hidden border-slate-200">
          <img
            src={course.thumbnailUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='540' viewBox='0 0 900 540'%3E%3Crect width='900' height='540' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='32' fill='%2394a3b8'%3ECoursify Course%3C/text%3E%3C/svg%3E"}
            alt={course.title}
            className="h-72 w-full object-cover"
          />
          <div className="space-y-3 p-5">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <CirclePlay className="h-4 w-4" />
                Preview available
              </span>
              <span>{sections.length} sections</span>
            </div>
            <p className="text-sm text-slate-500">Includes {lessons.length} lessons with videos, notes, and downloadable PDFs.</p>
          </div>
        </Card>
      </div>

      <div className="mt-10">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6 flex w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            <TabsTrigger value="overview" currentValue={tab} onValueChange={setTab}>
              Overview
            </TabsTrigger>
            <TabsTrigger value="curriculum" currentValue={tab} onValueChange={setTab}>
              Curriculum
            </TabsTrigger>
            <TabsTrigger value="reviews" currentValue={tab} onValueChange={setTab}>
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" currentValue={tab}>
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <Card className="p-6">
                <h2 className="text-xl font-bold">What you will learn</h2>
                <div
                  className="prose prose-slate mt-4 max-w-none"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold">Course facts</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <Fact label="Level" value={course.level} />
                  <Fact label="Price" value={formatPrice(course.discountPrice || course.price)} />
                  <Fact label="Lessons" value={String(lessons.length)} />
                  <Fact label="Enrollment" value={String(course.enrollmentCount || 0)} />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" currentValue={tab}>
            <div className="space-y-4">
              {sections.length === 0 ? (
                <EmptyState
                  title="Curriculum is empty"
                  description="Sections and lessons will appear here once the instructor adds them."
                  icon={ListVideo}
                />
              ) : (
                sections.map((section) => (
                  <details key={section._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" open>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-950">{section.title}</h3>
                        <p className="text-sm text-slate-500">{lessonsBySection[section._id]?.length || 0} lessons</p>
                      </div>
                      <BookOpen className="h-5 w-5 text-slate-500" />
                    </summary>
                    <div className="mt-4 space-y-2">
                      {(lessonsBySection[section._id] || []).map((lesson) => {
                        const locked = !lesson.isPreview && !isEnrolled;
                        return (
                          <div
                            key={lesson._id}
                            className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.type === "video" ? <Video className="h-4 w-4" /> : lesson.type === "pdf" ? <FileText className="h-4 w-4" /> : <MessageSquareMore className="h-4 w-4" />}
                              <div>
                                <p className="font-medium text-slate-900">{lesson.title}</p>
                                <p className="text-slate-500">{lesson.duration || 0} min</p>
                              </div>
                            </div>
                            {locked ? <Lock className="h-4 w-4 text-slate-400" /> : <Check className="h-4 w-4 text-emerald-600" />}
                          </div>
                        );
                      })}
                    </div>
                  </details>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" currentValue={tab}>
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Reviews</h2>
                  <Badge variant="secondary">{course.ratingCount || 0} reviews</Badge>
                </div>
                <div className="mt-5 space-y-4">
                  {reviewsQuery.isLoading ? (
                    <LoadingSpinner />
                  ) : reviewsQuery.isError ? (
                    <ErrorState description="We could not load reviews right now." onRetry={() => reviewsQuery.refetch()} />
                  ) : (reviewsQuery.data?.data || reviewsQuery.data || []).length === 0 ? (
                    <EmptyState title="No reviews yet" description="Be the first to share your experience." />
                  ) : (
                    (reviewsQuery.data?.data || reviewsQuery.data || []).map((review) => (
                      <div key={review._id} className="rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-950">{review.title || "Review"}</p>
                            <p className="text-sm text-slate-500">{review.isVerifiedPurchase ? "Verified enrollment" : "Review"}</p>
                          </div>
                          <StarRating value={review.rating} />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{review.comment || "No comment provided."}</p>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {isEnrolled ? (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold">Add a review</h3>
                  <form className="mt-4 space-y-4" onSubmit={submitReview}>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rating</label>
                      <Input type="number" min="1" max="5" {...reviewForm.register("rating")} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input {...reviewForm.register("title")} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Comment</label>
                      <Textarea rows={5} {...reviewForm.register("comment")} />
                    </div>
                    <Button type="submit" className="w-full">
                      Submit review
                    </Button>
                  </form>
                </Card>
              ) : null}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}
