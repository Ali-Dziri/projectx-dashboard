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
import { useMutation } from "@tanstack/react-query";
import FormDialog from "@/components/form-dialog";
import type { CategoriesData, UpsertCategory } from "./types";
import { useDialog } from "@/hooks/use-dialog";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
});

type CategoryFormSchemaType = z.infer<typeof formSchema>;

export default function CategoriesUpsertForm({
  addCategory,
  updateCategory,
}: {
  addCategory: (data: UpsertCategory) => Promise<CategoriesData>;
  updateCategory: (id: string, data: UpsertCategory) => Promise<CategoriesData>;
}) {
  const { payload } = useDialog<CategoriesData>();

  const upsertCategoryMutation = useMutation({
    mutationFn: async (values: CategoryFormSchemaType) => {
      if (payload?.id) {
        return await updateCategory(payload.id, values);
      }
      return await addCategory(values);
    },
  });

  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    values: payload ?? undefined,
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await upsertCategoryMutation.mutateAsync(data);
    if (result.id) {
      form.reset();
    }
  });

  return (
    <FormDialog
      handleFormSubmit={onSubmit}
      formDialogTitle="Add new Category"
      formId="upsert-category"
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
                  id="name"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  placeholder="Battery"
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
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">description</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id="description"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  placeholder="battery category for phones"
                  required
                />
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
