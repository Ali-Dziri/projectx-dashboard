import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PartsService } from "./parts.service";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const partsService = new PartsService();

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  modelId: z.string(),
  categoryId: z.string(),
  compatible_models: z.array(z.string().min(1)),
});

type PartsFormData = z.infer<typeof schema>;

export default function PartsUpsertForm({
  models,
  categories,
}: {
  models: Array<{ id: string; name: string }>;
  categories: Array<{ id: string; name: string }>;
}) {
  const default_values: PartsFormData = {
    name: "",
    modelId: "",
    categoryId: "",
    compatible_models: [],
  };
  const form = useForm({
    defaultValues: default_values,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      return await partsService.add(value);
    },
  });
  const [open, setOpen] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <div>
      <form
        id="upsert-part"
        data-testid="upsert-part"
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

          <div className="flex gap-3 align-middle items-center">
            <form.Field
              name="modelId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="w-full">
                    <FieldLabel htmlFor="brand">Model</FieldLabel>
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
                          {models.map((model) => (
                            <SelectItem
                              key={`model-${model.id}-${model.name}`}
                              value={model.id}
                            >
                              {model.name}
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
              name="categoryId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="brand">Category</FieldLabel>
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
                          {categories.map((category) => (
                            <SelectItem
                              key={`category-${category.id}-${category.name}`}
                              value={category.id}
                            >
                              {category.name}
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
          </div>

          <form.Field
            name="compatible_models"
            children={(field) => {
              const selectedValues = field.state.value;
              const selectedLabels = models
                .filter((opt) => selectedValues.includes(opt.id))
                .map((opt) => opt.name);

              return (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Compatible models
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between min-h-10 h-auto"
                      >
                        <div className="flex gap-1 flex-wrap">
                          {selectedValues.length === 0 ? (
                            <span className="text-muted-foreground">
                              Select frameworks...
                            </span>
                          ) : (
                            selectedLabels.map((label) => (
                              <Badge
                                variant="secondary"
                                key={label}
                                className="mr-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const option = models.find(
                                    (opt) => opt.name === label,
                                  );
                                  if (option) {
                                    field.handleChange(
                                      selectedValues.filter(
                                        (val) => val !== option.id,
                                      ),
                                    );
                                  }
                                }}
                              >
                                {label}
                                <X className="ml-1 h-3 w-3" />
                              </Badge>
                            ))
                          )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search frameworks..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {models.map((model) => {
                            const isSelected = selectedValues.includes(
                              model.id,
                            );
                            return (
                              <CommandItem
                                key={model.id}
                                onSelect={() => {
                                  if (isSelected) {
                                    field.handleChange(
                                      selectedValues.filter(
                                        (val) => val !== model.id,
                                      ),
                                    );
                                  } else {
                                    field.handleChange([
                                      ...selectedValues,
                                      model.id,
                                    ]);
                                  }
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    isSelected ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {model.name}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {selectedValues.length > 0 && (
                    <p className="text-sm text-gray-500">
                      {selectedValues.length} compatible models selected
                    </p>
                  )}
                </div>
              );
            }}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
