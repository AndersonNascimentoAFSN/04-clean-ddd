import { faker } from '@faker-js/faker'

import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to create a answer', async () => {
    const contentText = faker.lorem.text()

    const result = await sut.execute({
      content: contentText,
      instructorId: '1',
      questionId: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
