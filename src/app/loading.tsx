import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader size={32} className="animate-spin" />
    </div>
  );
}
