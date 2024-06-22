import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export type Answer = z.infer<typeof AnswerSchema>;
export const AnswerSchema = z.object({
  id: z.number(),
  text: z.string(),
});

export const PostAnswerSchema = z.object({
  params: z.object({ text: z.string() }),
});
