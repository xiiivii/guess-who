import fs from 'fs';

import { Answer } from '@/api/answer/answerModel';

const fileName = `${__dirname}/answers.json`;

const readAnswers = () => {
  try {
    const content = fs.readFileSync(fileName, 'utf-8');
    
    return JSON.parse(content);
  } catch {
    return [];
  }
};

const writeAnswers = (answers: Answer[]) => {
  fs.writeFileSync(fileName, JSON.stringify(answers, null, 2));
};

export const answerRepository = {
  listSync: (): Answer[] => {
    return readAnswers();
  },

  sendSync: (text: string): Answer => {
    const answers = readAnswers();
    const answer = { id: answers.length + 1, text };

    writeAnswers([...answers, answer]);

    return answer;
  },

  cleanSync: (): void => {
    writeAnswers([]);
  }
};
