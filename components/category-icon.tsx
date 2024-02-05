"use client";

import { cn } from "@/lib/utils";

export default function CategoryIcon({ color }:any) {
  return (
    <div className={cn(`unaffected w-4 h-4 rounded-md border-2 border-${color}`)}></div>
  );
}
