import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/gallery";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Gallery />;
}
