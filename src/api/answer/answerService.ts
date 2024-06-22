import { StatusCodes } from 'http-status-codes';

import { Answer } from '@/api/answer/answerModel';
import { answerRepository } from '@/api/answer/answerRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';

export const answerService = {
  list: (): ServiceResponse<Answer[] | null> => {
    const answers = answerRepository.listSync();

    return answers
      ? new ServiceResponse<Answer[]>(ResponseStatus.Success, 'Answers found', answers, StatusCodes.OK)
      : new ServiceResponse(ResponseStatus.Failed, 'No Answers found', null, StatusCodes.NOT_FOUND);
  },

  send: (text: string): ServiceResponse<Answer | null> => {
    const answer = answerRepository.sendSync(text);

    return answer
      ? new ServiceResponse<Answer>(ResponseStatus.Success, 'Answer found', answer, StatusCodes.OK)
      : new ServiceResponse(ResponseStatus.Failed, 'Answer not found', null, StatusCodes.NOT_FOUND);
  },

  clean: (): ServiceResponse<string> => {
    answerRepository.cleanSync();

    return new ServiceResponse<string>(ResponseStatus.Success, 'Answers cleaned', 'OK', StatusCodes.OK);
  }
};
