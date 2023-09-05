import { it, describe, expect } from 'vitest'

import { AnswerQuestionUseCase } from './answer-questions'

describe('Answer', () => {
  it('create an answer', () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const contentText = 'Nova resposta'

    const answer = answerQuestion.execute({
      content: contentText,
      questionId: '1',
      instructorId: '1',
    })

    expect(answer.content).toEqual(contentText)
  })
})