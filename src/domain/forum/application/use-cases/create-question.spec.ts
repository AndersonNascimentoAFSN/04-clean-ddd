import { faker } from '@faker-js/faker'

import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test'
import { UniqueEntityID } from '@/core'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to create a question', async () => {
    const contentText = faker.lorem.text()

    const result = await sut.execute({
      title: 'Nova pergunta',
      content: contentText,
      authorId: '1',
      attachmentsIds: [],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(0)
  })

  it('should be able to create a question with attachments', async () => {
    const contentText = faker.lorem.text()

    const result = await sut.execute({
      title: 'Nova pergunta',
      content: contentText,
      authorId: '1',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)

    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
