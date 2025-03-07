import { HydrateClient, trpc } from "@/trpc/server";
import { Client } from "./client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {
  void trpc.hello.prefetch({ text: "World" });
  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error</p>}>
          <Client />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
