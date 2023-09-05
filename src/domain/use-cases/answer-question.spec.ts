import { it, describe, expect } from 'vitest'

import { AnswerQuestionUseCase } from './answer-questions'

describe('Answer', () => {
  it('create an answer', () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const contentText = 'Nova resposta'

    const answer = answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      authorId: '1',
      content: contentText,
    })

    expect(answer.content).toEqual(contentText)
  })
})