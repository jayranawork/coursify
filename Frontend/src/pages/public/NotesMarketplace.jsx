import { ArrowRight, FileText, ShieldCheck, Wallet } from "lucide-react";
import { Button, Card } from "@/components/ui";

export function NotesMarketplace() {
  return (
    <div className="page-shell py-10 sm:py-14">
      <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="eyebrow">Notes Marketplace</p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
              Sell and buy study notes in one focused space.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
              This section will become the notes marketplace where learners can upload PDF notes, browse study packs, and purchase
              useful resources.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button>
                Explore notes
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline">Sell notes</Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <StatCard icon={FileText} title="PDF notes" description="Handwritten and structured note uploads." />
              <StatCard icon={ShieldCheck} title="Secure access" description="Purchases and downloads stay controlled." />
              <StatCard icon={Wallet} title="Creator earnings" description="A simple way for sellers to earn." />
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden bg-gradient-to-br from-violet-700 via-fuchsia-700 to-indigo-900 p-8 text-white sm:p-12">
            <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Phase 2</p>
                <h2 className="mt-4 max-w-sm text-3xl font-bold">A marketplace built for useful study material.</h2>
              </div>
              <Card className="mt-10 border-white/15 bg-white/10 p-5 text-white shadow-none backdrop-blur">
                <p className="text-sm text-white/70">Coming soon</p>
                <p className="mt-2 text-lg font-semibold">Upload, preview, purchase, and access notes from one place.</p>
              </Card>
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
