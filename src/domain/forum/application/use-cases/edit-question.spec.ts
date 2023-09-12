import { InMemoryQuestionsRepository } from 'test'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core'
import { NotAllowedError } from './errors'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question By Id', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question by id', async () => {
    const questionId = 'question-1'
    const authorId = 'author-1'

    const newQuestion = makeQuestion({
      id: new UniqueEntityID(questionId),
      override: { authorId: new UniqueEntityID(authorId) },
    })

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId,
      questionId: newQuestion.id.toString(),
      content: 'New question content',
      title: 'New question title',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'New question title',
      content: 'New question content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      id: new UniqueEntityID('question-1'),
      override: { authorId: new UniqueEntityID('author-1') },
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: newQuestion.id.toString(),
      content: 'New question content',
      title: 'New question title',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
