import { faker } from '@faker-js/faker'

import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to create a question', async () => {
    const contentText = faker.lorem.text()

    const { question } = await sut.execute({
      title: 'Nova pergunta',
      content: contentText,
      authorId: '1',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual(contentText)
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
