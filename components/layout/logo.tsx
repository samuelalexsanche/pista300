import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2", className)} aria-label="Pista300, inicio">
      <span className="bg-foreground text-background flex size-8 items-center justify-center rounded-lg">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <circle cx="12" cy="12" r="10" className="fill-primary" />
          <circle cx="9" cy="9" r="1.6" className="fill-background" />
          <circle cx="13.4" cy="8" r="1.6" className="fill-background" />
          <circle cx="11.4" cy="12.4" r="1.6" className="fill-background" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        Pista<span className="text-primary font-mono">300</span>
      </span>
    </Link>
  );
}
