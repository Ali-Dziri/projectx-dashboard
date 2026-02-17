import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import FormDialog from "@/components/form-dialog";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import type { ModelDataType, UpsertModel } from "./types";
import { useDialog } from "@/hooks/use-dialog";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string(),
  release_date: z.date().optional(),
});

type ModelFormType = z.infer<typeof formSchema>;

export default function ModelsUpsertForm({
  brands,
  addModel,
  updateModel,
}: {
  brands: Array<{ name: string; id: string }>;
  addModel: (data: UpsertModel) => Promise<ModelDataType>;
  updateModel: (id: string, data: UpsertModel) => Promise<ModelDataType>;
}) {
  const { payload } = useDialog<ModelDataType>();

  const upsertModelMutation = useMutation({
    mutationFn: async (values: ModelFormType) => {
      if (payload?.id) {
        return await updateModel(payload.id, values);
      }
      return await addModel(values);
    },
  });

  const initialValues = {
    name: payload?.name ?? "",
    brand: payload?.brand.id ?? "",
    release_date: payload?.release_date ?? undefined,
  };
  const form = useForm<ModelFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      release_date: new Date(),
    },
    values: payload ? initialValues : undefined,
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await upsertModelMutation.mutateAsync(data);
    if (result.id) {
      form.reset();
    }
  });

  return (
    <FormDialog
      handleFormSubmit={onSubmit}
      formDialogTitle="Add new Model"
      formId="upsert-model"
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
                  placeholder="Galaxy s24"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          name="brand"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="brand">Brand</FieldLabel>
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          name="release_date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="release_date">Release date</FieldLabel>
              <FieldContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!field.value}
                      className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
                    >
                      {field.value ? (
                        <span>{dayjs(field.value).format("MMM D, YYYY")}</span>
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      defaultMonth={field.value}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
    </FormDialog>
  );
}
