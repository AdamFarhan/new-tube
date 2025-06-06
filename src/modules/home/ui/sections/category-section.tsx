"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  categoryId?: string;
}

export const CategorySection = (props: Props) => {
  return (
    <Suspense
      fallback={<FilterCarousel isLoading data={[]} onSelect={() => {}} />}
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <CategorySectionSuspense {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};

export const CategorySectionSuspense = ({ categoryId }: Props) => {
  const router = useRouter();
  const [categories] = trpc.categories.getMany.useSuspenseQuery();

  const filters = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };

  return (
    <FilterCarousel value={categoryId} data={filters} onSelect={onSelect} />
  );
};
