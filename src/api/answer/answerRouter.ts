import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';

import { AnswerSchema } from '@/api/answer/answerModel';
import { answerService } from '@/api/answer/answerService';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const answerRegistry = new OpenAPIRegistry();

answerRegistry.register('Answer', AnswerSchema);

export const answerRouter: Router = (() => {
  const router = express.Router();

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = answerService.list();

    handleServiceResponse(serviceResponse, res);
  });

  router.post('/', async (req: Request, res: Response) => {
    const serviceResponse = answerService.send(req.query.text as string);

    handleServiceResponse(serviceResponse, res);
  });

  router.get('/clean', async (_req: Request, res: Response) => {
    const serviceResponse = answerService.clean();

    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
