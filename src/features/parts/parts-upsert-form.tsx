import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import type { PartsData, UpsertParts } from "./type";
import { useMutation } from "@tanstack/react-query";
import FormDialog from "@/components/form-dialog";
import { useDialog } from "@/hooks/use-dialog";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  modelId: z.string(),
  categoryId: z.string(),
  compatible_models: z.array(z.string().min(1)),
});

type PartsFormData = z.infer<typeof formSchema>;

export default function PartsUpsertForm({
  models,
  categories,
  addPart,
  updatePart,
}: {
  models: Array<{ id: string; name: string }>;
  categories: Array<{ id: string; name: string }>;
  addPart: (data: UpsertParts) => Promise<PartsData>;
  updatePart: (id: string, data: UpsertParts) => Promise<PartsData>;
}) {
  const { payload } = useDialog<PartsData>();
  const [open, setOpen] = useState(false);

  const upsertPartMutation = useMutation({
    mutationFn: async (values: PartsFormData) => {
      if (payload?.id) {
        return await updatePart(payload.id, values);
      }
      return await addPart(values);
    },
  });

  const initialValues = {
    name: payload?.name ?? "",
    modelId: payload?.model.id ?? "",
    categoryId: payload?.category.id ?? "",
    compatible_models: payload?.compatible_models.map((item) => item.id) ?? [],
  };

  const form = useForm<PartsFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      modelId: "",
      categoryId: "",
      compatible_models: [],
    },
    values: payload ? initialValues : undefined,
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await upsertPartMutation.mutateAsync(data);
    if (result.id) {
      form.reset();
    }
  });

  return (
    <FormDialog
      handleFormSubmit={onSubmit}
      formDialogTitle="Add new Part"
      formId="upsert-part"
      loading={form.formState.isSubmitting}
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="text"
                  placeholder="Samsung"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        <div className="flex gap-3 align-middle items-center">
          <Controller
            name="modelId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel htmlFor="brand">Model</FieldLabel>
                <FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="upsert-form-brand-select"
                      aria-invalid={fieldState.invalid}
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />

          <Controller
            name="categoryId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="brand">Category</FieldLabel>
                <FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="upsert-form-brand-select"
                      aria-invalid={fieldState.invalid}
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </div>

        <Controller
          name="compatible_models"
          control={form.control}
          render={({ field }) => {
            const selectedValues = field.value;
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
                            Select models...
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
                                  field.onChange(
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
                      <CommandInput placeholder="Search models..." />
                      <CommandEmpty>No model found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {models.map((model) => {
                          const isSelected = selectedValues.includes(model.id);
                          return (
                            <CommandItem
                              key={model.id}
                              onSelect={() => {
                                if (isSelected) {
                                  field.onChange(
                                    selectedValues.filter(
                                      (val) => val !== model.id,
                                    ),
                                  );
                                } else {
                                  field.onChange([...selectedValues, model.id]);
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
    </FormDialog>
  );
}
