import { faker } from '@faker-js/faker'

import { InMemoryQuestionsRepository } from 'test'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '@/domain/forum/enterprise/entities'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const slugText = faker.lorem.text()

    const newQuestion = Question.create({
      title: 'Example question',
      slug: Slug.create(slugText),
      content: 'Example content',
      authorId: new UniqueEntityID(),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: slugText,
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
    expect(question.content).toEqual(newQuestion.content)
  })
})
