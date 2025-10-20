import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="relative h-[50vh] min-h-[350px] w-full bg-muted">
        <div className="container absolute bottom-12">
            <Skeleton className="h-12 w-3/4 max-w-2xl mb-4" />
            <Skeleton className="h-16 w-1/2 max-w-xl" />
        </div>
      </div>
      <div className="container py-12">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-12" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="w-full md:w-64">
             <div className="flex flex-col gap-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
