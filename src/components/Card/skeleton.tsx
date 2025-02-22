export default function CardSkeleton() {
  return (
    <div className=" bg-white rounded-lg border border-neutral-300 overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-square overflow-hidden">
        <div className="w-full h-full bg-neutral-300" />
      </div>
      <div className="p-4">
        <div className="w-3/4 h-4 bg-neutral-300" />
        <div className="w-1/2 h-4 bg-neutral-300 mt-2" />
        <div className="w-1/4 h-4 bg-neutral-300 mt-2" />
      </div>
    </div>
  );
}
