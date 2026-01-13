import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "pending" | "delivered" | "cancelled" | "processing" | "active" | "inactive";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  
  let variant = "secondary";
  let styles = "";

  switch (normalizedStatus) {
    case "delivered":
    case "completed":
    case "active":
      styles = "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
      break;
    case "pending":
    case "processing":
      styles = "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200";
      break;
    case "cancelled":
    case "inactive":
    case "disabled":
      styles = "bg-red-100 text-red-700 hover:bg-red-100 border-red-200";
      break;
    default:
      styles = "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200";
  }

  return (
    <Badge variant="outline" className={cn("capitalize font-medium border", styles, className)}>
      {status}
    </Badge>
  );
}
