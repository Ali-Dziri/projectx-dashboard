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
import countries from "../../assets/world.json";
import { BrandsService } from "./brands.service";

const brandsService = new BrandsService();

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  website: z.url().optional(),
  countryOfOrigin: z.string().optional(),
});

type BrandFormValues = z.infer<typeof formSchema>;

export default function BrandsUpsertForm() {
  const defaultBrand: BrandFormValues = {
    name: "",
    website: "",
    countryOfOrigin: "",
  };
  const form = useForm({
    defaultValues: defaultBrand,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      return await brandsService.add(value);
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <div>
      <form
        id="upsert-brand"
        data-testid="upsert-brand"
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
            name="website"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="website">Website</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      type="url"
                      placeholder="https://www.samsung.com"
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
            name="countryOfOrigin"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="countryOfOrigin">Country</FieldLabel>
                  <FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id="upsert-form-country-select"
                        aria-invalid={isInvalid}
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
