import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModelsService } from "./models.service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";

const modelsService = new ModelsService();

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string(),
  release_date: z.date().optional(),
});

type ModelFormType = z.infer<typeof formSchema>;

export default function ModelsUpsertForm({
  brands,
}: {
  brands: Array<{ name: string; id: string }>;
}) {
  const default_values: ModelFormType = {
    name: "",
    brand: "",
    release_date: new Date(),
  };
  const form = useForm({
    defaultValues: default_values,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      return await modelsService.add(value);
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <div>
      <form
        id="upsert-model"
        data-testid="upsert-model"
        onSubmit={handleFormSubmit}
      >
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      type="text"
                      placeholder="Samsung"
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldContent>
                </Field>
              );
            }}
          />
          <form.Field
            name="brand"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="brand">Brand</FieldLabel>
                  <FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id="upsert-form-brand-select"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {brands.map((brand) => (
                          <SelectItem
                            key={`country-${brand.id}-${brand.name}`}
                            value={brand.id}
                          >
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldContent>
                </Field>
              );
            }}
          />
          <form.Field
            name="release_date"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="release_date">Release date</FieldLabel>
                  <FieldContent>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.state.value}
                          className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
                        >
                          {field.state.value ? (
                            <span>
                              {dayjs(field.state.value).format("MMM D, YYYY")}
                            </span>
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={field.handleChange}
                          defaultMonth={field.state.value}
                        />
                      </PopoverContent>
                    </Popover>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldContent>
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
