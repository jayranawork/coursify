import { ArrowRight, ListVideo, PlayCircle, Timer } from "lucide-react";
import { Button, Card } from "@/components/ui";

export function FocusPlaylists() {
  return (
    <div className="page-shell py-10 sm:py-14">
      <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[320px] overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-900 p-8 text-white sm:p-12 lg:p-14">
            <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Phase 3</p>
                <h2 className="mt-4 max-w-sm text-3xl font-bold">A distraction-free way to watch YouTube playlists.</h2>
              </div>
              <Card className="mt-10 border-white/15 bg-white/10 p-5 text-white shadow-none backdrop-blur">
                <p className="text-sm text-white/70">Coming soon</p>
                <p className="mt-2 text-lg font-semibold">Import playlists, save progress, and stay focused.</p>
              </Card>
            </div>
          </div>

          <div className="p-8 sm:p-12 lg:p-14">
            <p className="eyebrow">Focus Playlists</p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
              Turn playlists into focused study sessions.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
              This section will become the focus playlist experience where users can import YouTube playlists and watch them in a clean
              learning layout.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button>
                Import playlist
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline">Browse playlists</Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <StatCard icon={ListVideo} title="Playlist import" description="Bring in public playlists from YouTube." />
              <StatCard icon={PlayCircle} title="Focused player" description="Watch without distractions or clutter." />
              <StatCard icon={Timer} title="Progress saved" description="Resume from your last watched point." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, title, description }) {
  return (
    <Card className="border-neutral-200 p-4 dark:border-neutral-800">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-semibold text-neutral-950 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
      </div>
    </Card>
  );
}
