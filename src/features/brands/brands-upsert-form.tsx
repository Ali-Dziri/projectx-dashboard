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
import countries from "../../assets/world.json";
import { useMutation } from "@tanstack/react-query";
import FormDialog from "@/components/form-dialog";
import type { BrandsData, UpsertBrand } from "./types";
import { useDialog } from "@/hooks/use-dialog";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  website: z.url().optional(),
  countryOfOrigin: z.string().optional(),
});

type BrandFormValues = z.infer<typeof formSchema>;

export default function BrandsUpsertForm({
  addBrand,
  updateBrand,
}: {
  addBrand: (data: UpsertBrand) => Promise<BrandsData>;
  updateBrand: (id: string, data: UpsertBrand) => Promise<BrandsData>;
}) {
  const { payload } = useDialog<BrandsData>();

  const upsertBrandMutation = useMutation({
    mutationFn: async (values: BrandFormValues) => {
      if (payload?.id) {
        return await updateBrand(payload.id, values);
      }
      return await addBrand(values);
    },
  });

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      website: "",
      countryOfOrigin: "",
    },
    values: payload ?? undefined,
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await upsertBrandMutation.mutateAsync(data);
    if (result.id) {
      form.reset();
    }
  });

  return (
    <FormDialog
      handleFormSubmit={onSubmit}
      formDialogTitle="Add new Brand"
      formId="upset-brand"
      loading={form.formState.isSubmitting}
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Samsung"
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="website"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id="website"
                  aria-invalid={fieldState.invalid}
                  type="url"
                  placeholder="https://www.samsung.com"
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
          name="countryOfOrigin"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="countryOfOrigin">Country</FieldLabel>
              <FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="upsert-form-country-select"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {countries.map((country) => (
                      <SelectItem
                        key={`country-${country.alpha2}-${country.id}`}
                        value={country.alpha2}
                      >
                        {country.name}
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
      </FieldGroup>
    </FormDialog>
  );
}
