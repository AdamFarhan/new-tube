"use client";
import { trpc } from "@/trpc/client";

export const Client = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "World" });
  return <div>{data.greeting}</div>;
};
