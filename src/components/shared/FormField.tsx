import * as React from "react";
import { useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { cn } from "@/lib/utils";

import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { CalendarIcon } from "lucide-react";

function FormInput({
  label,
  placeholder,
  field,
  className,
  children,
}: {
  label: string | React.ReactNode;
  placeholder: string;
  field: any;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <FormItem className={cn("gap-1.5", className)}>
      <FormLabel className="text-sm font-semibold font-unbounded uppercase">
        {label}
      </FormLabel>
      <FormControl>
        <Input
          className="bg-white py-3.5 px-3 h-fit placeholder:text-muted-foreground"
          placeholder={placeholder}
          {...field}
        />
      </FormControl>
      {children}
    </FormItem>
  );
}

function FormDatePicker({
  label,
  placeholder,
  field,
  className,
  children,
}: {
  label: string | React.ReactNode;
  placeholder: string;
  field: any;
  className?: string;
  children?: React.ReactNode;
}) {
  const {
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[field.name];
  const [open, setOpen] = React.useState(false);

  const createDate = (value: any): Date | undefined => {
    if (!value) return undefined;
    if (value instanceof Date) return value;
    return new Date(value);
  };

  const date = React.useMemo(() => createDate(field.value), [field.value]);

  const displayValue = React.useMemo(() => {
    return date ? date.toLocaleDateString("ru-RU") : "";
  }, [date]);

  return (
    <FormItem className={cn("gap-1.5", className)}>
      <FormLabel className="text-sm font-semibold font-unbounded uppercase">
        {label}
      </FormLabel>
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                className="bg-white py-3.5 px-3 h-auto placeholder:text-muted-foreground cursor-pointer"
                placeholder={placeholder}
                value={displayValue}
                readOnly
                aria-invalid={fieldError ? "true" : "false"}
                onBlur={field.onBlur}
                name={field.name}
              />
              <Button
                variant="ghost"
                className="absolute right-0 top-0 bottom-0 px-3 text-muted-foreground pointer-events-none"
              >
                <CalendarIcon />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              captionLayout="dropdown"
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              onSelect={(selectedDate) => {
                field.onChange(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      {children}
    </FormItem>
  );
}

function FormPhoneInput({
  label,
  placeholder,
  format,
  field,
  className,
  children,
}: {
  label: string | React.ReactNode;
  placeholder: string;
  format: string;
  field: any;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <FormItem className={cn("gap-1.5", className)}>
      <FormLabel className="text-sm font-semibold font-unbounded uppercase">
        {label}
      </FormLabel>
      <FormControl>
        <PatternFormat
          format={format}
          placeholder={placeholder}
          value={field.value || ""}
          onValueChange={(values) => {
            field.onChange(values.value);
          }}
          onBlur={field.onBlur}
          name={field.name}
          customInput={Input}
          className="bg-white py-3.5 px-3 h-auto placeholder:text-muted-foreground"
          type="tel"
        />
      </FormControl>
      {children}
    </FormItem>
  );
}

function FormCheckbox({
  label,
  options,
  field,
  className,
  children,
}: {
  label: string | React.ReactNode;
  options: { label: string | React.ReactNode; value: string }[];
  field: any;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <FormItem className={cn("gap-1.5", className)}>
      <FormLabel className="text-sm font-semibold font-unbounded uppercase">
        {label}
      </FormLabel>
      <div className="flex flex-wrap gap-x-5 gap-y-6">
        {options.map((option, index) => (
          <FormField
            key={index}
            control={field.control}
            name={field.name}
            render={({ field }) => {
              return (
                <FormItem
                  key={index}
                  className="flex flex-row items-center gap-2"
                >
                  <FormControl>
                    <Checkbox
                      className="size-6 rounded-sm bg-white"
                      checked={
                        Array.isArray(field.value) &&
                        field.value.includes(option.value)
                      }
                      onCheckedChange={(checked) => {
                        const currentValue = Array.isArray(field.value)
                          ? field.value
                          : [];
                        return checked
                          ? field.onChange([...currentValue, option.value])
                          : field.onChange(
                              currentValue.filter(
                                (value: string) => value !== option.value
                              )
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-muted-foreground">
                    {option.label}
                  </FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
      </div>
      {children}
    </FormItem>
  );
}

function FormRadio({
  label,
  options,
  field,
  className,
  children,
}: {
  label: string | React.ReactNode;
  options: { label: string | React.ReactNode; value: string }[];
  field: any;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <FormItem className={cn("gap-1.5", className)}>
      <FormLabel className="text-sm font-semibold font-unbounded uppercase">
        {label}
      </FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-wrap gap-x-5 gap-y-6"
        >
          {options.map((option, index) => (
            <FormItem className="flex items-center gap-2" key={index}>
              <FormControl>
                <RadioGroupItem
                  className="bg-white size-5 text-foreground [&_svg]:fill-foreground [&_svg]:size-3 aria-checked:border-primary"
                  value={option.value}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal text-muted-foreground">
                {option.label}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      {children}
    </FormItem>
  );
}

function FormTextarea({
  label,
  placeholder,
  field,
  className,
  children,
}: {
  label: string | React.ReactNode;
  placeholder: string;
  field: any;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <FormItem className={cn("gap-1.5", className)}>
      <FormLabel className="text-sm font-semibold font-unbounded uppercase">
        {label}
      </FormLabel>
      <FormControl>
        <Textarea
          className="bg-white py-3.5 px-3 h-fit placeholder:text-muted-foreground"
          placeholder={placeholder}
          {...field}
        />
      </FormControl>
      {children}
    </FormItem>
  );
}

export {
  FormInput,
  FormDatePicker,
  FormPhoneInput,
  FormCheckbox,
  FormRadio,
  FormTextarea,
};
