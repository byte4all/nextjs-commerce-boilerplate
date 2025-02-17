import Link from "next/link";
import { HeroCarousel } from "~/app/_components/HeroCarousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroCarousel />
    </main>
  );
}
