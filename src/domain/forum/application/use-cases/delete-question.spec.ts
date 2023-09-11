import { InMemoryQuestionsRepository } from 'test'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question By Id', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question by id', async () => {
    const newQuestion = makeQuestion({
      id: new UniqueEntityID('question-1'),
      override: { authorId: new UniqueEntityID('author-1') },
    })

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
      id: new UniqueEntityID('question-1'),
      override: { authorId: new UniqueEntityID('author-1') },
    })

    inMemoryQuestionsRepository.create(newQuestion)

    expect(() =>
      sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
