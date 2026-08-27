import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar1 } from "lucide-react";

export function DatePicker({
  label = "Date",
  disabled = false,
  onChange,
  value,
}: {
  label?: string;
  disabled?: boolean;
  onChange: (date: Date) => void;
  value: Date;
}) {
  return (
    <div className="flex items-center gap-1 w-full ">
      <p className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </p>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button variant="outline" classNameChildren="flex items-center gap-2 justify-between">
            {value?.toLocaleDateString() || "Select a date"}
            <Calendar1 />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Calendar
            mode="single"
            onDayClick={(data) => {
              onChange(new Date(data));
            }}
            data-day={value}
            selected={value}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
