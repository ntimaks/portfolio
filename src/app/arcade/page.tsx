"use client";
import { useState } from "react";
import { PageHeader, RuledDivider } from "@/components/primitives";
import { SnakeGame } from "@/components/snake/Game";
import { Leaderboard } from "@/components/snake/Leaderboard";

export default function ArcadePage() {
  const [k, setK] = useState(0);
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-16">
      <PageHeader code="ARC.01" title="Arcade" meta="snake.exe · single cab" accent="kelly" />
      <p className="max-w-2xl text-[14px] text-ink-2 mb-6">
        one machine, one game. submit your initials when it&apos;s done.
      </p>
      <RuledDivider pattern="slash" />
      <div className="grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-8 items-start">
        <div className="overflow-x-auto">
          <SnakeGame onSubmitted={() => setK((x) => x + 1)} />
        </div>
        <Leaderboard refreshKey={k} />
      </div>
    </div>
  );
}
