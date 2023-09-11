import { InMemoryAnswersRepository } from 'test'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories'
import { UniqueEntityID } from '@/core'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer By Id', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer by id', async () => {
    const newAnswer = makeAnswer({
      id: new UniqueEntityID('answer-1'),
      override: { authorId: new UniqueEntityID('author-1') },
    })

    inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'new answer content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'new answer content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
      id: new UniqueEntityID('answer-1'),
      override: { authorId: new UniqueEntityID('author-1') },
    })

    inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'author-2',
        content: 'new answer content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
