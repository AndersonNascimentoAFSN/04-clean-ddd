// import { it, describe, expect } from 'vitest'

import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async function(answer: Answer): Promise<void> {
    return;
  }
}

describe('Answer', () => {
  it('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const contentText = 'Nova resposta'

    const answer = await answerQuestion.execute({
      content: contentText,
      questionId: '1',
      instructorId: '1',
    })

    expect(answer.content).toEqual(contentText)
  })
})