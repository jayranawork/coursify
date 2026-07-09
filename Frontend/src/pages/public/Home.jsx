import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, Search, Users, CheckCircle2 } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useFeaturedCourses } from "@/hooks/useCourses";
import { Button, Card } from "@/components/ui";
import { SearchBar } from "@/components/common/SearchBar";
import { CourseCard } from "@/components/common/CourseCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { toast } from "sonner";

export function Home() {
  const navigate = useNavigate();
  const categoriesQuery = useCategories();
  const coursesQuery = useFeaturedCourses();

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <section className="page-shell py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Learn, build, and level up with Coursify
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                A sharper place to teach and learn online.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Discover hands-on courses, track progress, and manage your teaching or learning journey from one calm, focused dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="min-w-0 flex-1">
                <SearchBar
                  placeholder="Search any course..."
                  onSubmit={(value) => {
                    const query = value.trim();
                    navigate(query ? `/courses?search=${encodeURIComponent(query)}` : "/courses");
                  }}
                />
              </div>
              <Button size="lg" onClick={() => navigate("/courses")}>
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Courses" value="500+" icon={BookOpen} />
              <Stat label="Students" value="10K+" icon={Users} />
              <Stat label="Completion" value="95%" icon={GraduationCap} />
            </div>
          </div>

          <Card className="relative overflow-hidden border-slate-200">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(148,163,184,0.18),_transparent_35%)]" />
            <div className="relative p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Featured Learning</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">Built for focus, not clutter.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Browse categories, save favorites, and jump back into lessons with a clean, role-aware workspace.
              </p>
              <div className="mt-6 grid gap-3">
                {["Personalized dashboards", "Progress tracking", "Instructor tools", "Admin controls"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-slate-900" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="page-shell pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Categories</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Explore what people are learning.</h2>
          </div>
        </div>

        {categoriesQuery.isLoading ? (
          <LoadingSpinner />
        ) : categoriesQuery.isError ? (
          <ErrorState description="We could not load categories right now." onRetry={() => categoriesQuery.refetch()} />
        ) : (categoriesQuery.data || []).length === 0 ? (
          <EmptyState
            title="No categories found"
            description="There are no active categories yet."
            icon={Search}
            actionLabel="Browse courses"
            onAction={() => navigate("/courses")}
          />
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(categoriesQuery.data || []).map((category) => (
              <button
                key={category._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300"
                onClick={() => navigate(`/courses?categoryId=${category._id}`)}
              >
                <p className="text-sm text-slate-500">{category.slug}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">{category.name}</h3>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="page-shell pb-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Featured</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Featured courses for this week.</h2>
          </div>
          <Button variant="outline" onClick={() => navigate("/courses")}>
            View all
          </Button>
        </div>

        {coursesQuery.isLoading ? (
          <LoadingSpinner />
        ) : coursesQuery.isError ? (
          <ErrorState description="We could not load featured courses right now." onRetry={() => coursesQuery.refetch()} />
        ) : (coursesQuery.data?.data || coursesQuery.data || []).length === 0 ? (
          <EmptyState
            title="No featured courses"
            description="Featured courses will appear here once the backend has some published entries."
            icon={BookOpen}
            actionLabel="Create a course"
            onAction={() => toast.info("Open the instructor dashboard to create a course.")}
          />
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {(coursesQuery.data?.data || coursesQuery.data || []).map((course) => (
              <CourseCard key={course._id} course={course} href={`/courses/${course.slug}`} actionLabel="Explore" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <Card className="border-slate-200">
      <div className="flex items-center gap-4 p-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-slate-950">{value}</p>
        </div>
      </div>
    </Card>
  );
}
