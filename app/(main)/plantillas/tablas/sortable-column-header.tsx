import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface SortableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function SortableColumnHeader<TData, TValue>({
  column,
  title,
}: SortableColumnHeaderProps<TData, TValue>) {
  return (
    <Button
      variant="ghostNoHover"
      onClick={() => {
        const currentSortingState = column.getIsSorted();
        if (currentSortingState === false) {
          column.toggleSorting(false); // Set to ascending
        } else if (currentSortingState === "asc") {
          column.toggleSorting(true); // Set to descending
        } else {
          column.clearSorting(); // Reset sorting
        }
      }}
      className="w-full"
    >
      <div className="flex w-full justify-between">
        <span>{title}</span>
        {column.getIsSorted() === "asc" ? (
          <ChevronUp className="h-4 w-4 text-foreground" />
        ) : column.getIsSorted() === "desc" ? (
          <ChevronDown className="h-4 w-4 text-foreground" />
        ) : (
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </Button>
  );
}
