import { Spinner } from "../(components)/ui/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
      <Spinner className="size-8"/>
    </div>
  );
}