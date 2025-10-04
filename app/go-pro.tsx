"use client";

import { Button } from "@/components/ui/button";

export default function GoPro() {
  return (
    <Button onClick={() => window.location.href = "/upgrade"} className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black font-semibold">Go PRO</Button>
  );
}
