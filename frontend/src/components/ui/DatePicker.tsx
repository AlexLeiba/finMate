import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar1 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Calendar } from "../ui/calendar";

export function DatePicker({
  label = "Date",
  name = "date",
}: {
  label?: string;
  name: string;
}) {
  const { control } = useFormContext();

  const date = useWatch({ name: name });
  return (
    <div className="flex flex-col gap-1 w-full ">
      <p className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </p>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            classNameChildren="flex items-center gap-2 justify-between"
          >
            {date?.toLocaleDateString() || "Select a date"}
            <Calendar1 />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Calendar
                onDayClick={(data) => {
                  onChange(new Date(data));
                }}
                data-day={new Date()}
                selected={value}
              />
            )}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
