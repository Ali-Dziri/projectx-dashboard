import { z } from "zod";

export const searchParamsSchema = z.object({
  page: z.number().catch(1),
  limit: z.number().optional().catch(10),
  search: z.string().optional().catch(""),
});
