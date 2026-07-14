import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, BookOpen, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";
import { SearchBar } from "@/components/common/SearchBar";

export function Hero1({ onBrowse, onSearch }) {
  return (
    <section className="relative isolate min-h-[calc(100vh-72px)] overflow-hidden bg-[#fbfbfa] text-neutral-950 dark:bg-[#06060c] dark:text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(23,23,23,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,23,0.045)_1px,transparent_1px)] [background-size:52px_52px] dark:opacity-80 dark:[background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute -bottom-32 left-[-8%] h-[620px] w-[720px] rounded-[45%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(190,140,255,0.28),rgba(190,140,255,0.1)_35%,transparent_72%)] blur-2xl dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(158,92,255,0.75),rgba(49,20,98,0.38)_35%,transparent_72%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[55%] w-[55%] opacity-30 [background-image:linear-gradient(90deg,rgba(120,70,220,0.2)_1px,transparent_1px),linear-gradient(rgba(120,70,220,0.16)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_top_right,black,transparent_78%)] dark:opacity-60 dark:[background-image:linear-gradient(90deg,rgba(164,116,255,0.24)_1px,transparent_1px),linear-gradient(rgba(164,116,255,0.18)_1px,transparent_1px)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-7xl flex-col justify-between px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-4xl pt-8 sm:pt-12 lg:pt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-lime-700 dark:text-lime-300"><Sparkles className="h-3.5 w-3.5" /> Coursify learning platform</p>
            <h1 className="max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.06em] text-neutral-950 sm:text-7xl lg:text-[6.8rem] dark:text-white">Learn with focus,<br /><span className="text-neutral-500 dark:text-neutral-400">build with confidence.</span></h1>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="group w-fit rounded-lg bg-neutral-950 pl-5 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200" onClick={onBrowse}>Browse courses <span className="grid h-8 w-8 place-items-center rounded-md bg-white text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:bg-black dark:text-white"><ArrowUpRight className="h-4 w-4" /></span></Button>
              <div className="w-full max-w-sm [&_input]:border-neutral-300 [&_input]:bg-white/80 [&_input]:text-neutral-950 [&_input]:placeholder:text-neutral-500 dark:[&_input]:border-white/15 dark:[&_input]:bg-white/5 dark:[&_input]:text-white dark:[&_input]:placeholder:text-white/40"><SearchBar placeholder="Search courses..." onSubmit={onSearch} /></div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="grid gap-10 pt-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl"><p className="text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-200">Structured courses, focused lessons, and a calm workspace for learning useful things and making better work.</p><div className="mt-6 flex flex-wrap gap-3 text-xs text-neutral-600 dark:text-neutral-400"><span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/70 px-3 py-2 dark:border-white/15 dark:bg-white/5"><BookOpen className="h-3.5 w-3.5 text-lime-700 dark:text-lime-300" /> Video and PDF lessons</span><span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/70 px-3 py-2 dark:border-white/15 dark:bg-white/5">Progress saved automatically</span></div></div>
          <div className="flex items-center justify-between gap-8 text-sm text-neutral-600 lg:gap-12 dark:text-neutral-300"><span className="hidden items-center gap-2 md:flex">Scroll to discover <ArrowDown className="h-4 w-4 text-lime-700 dark:text-lime-300" /></span><span>Learn</span><span>Teach</span><span>Grow</span></div>
        </motion.div>
      </div>
    </section>
  );
}
