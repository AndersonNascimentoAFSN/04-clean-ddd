import { faker } from '@faker-js/faker'

import {
  InMemoryAnswerCommentsRepository,
  InMemoryAnswersRepository,
} from 'test'
import { makeAnswer } from 'test/factories'
import { UniqueEntityID } from '@/core'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const commentContent = faker.lorem.text()

    const answer = makeAnswer({})

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: commentContent,
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      commentContent,
    )
  })

  it('should not be able to comment if answer not exists', async () => {
    const answer = makeAnswer({
      id: new UniqueEntityID('answer-1'),
      override: { authorId: new UniqueEntityID('author-1') },
    })

    await inMemoryAnswersRepository.create(answer)

    await expect(() =>
      sut.execute({
        authorId: answer.authorId.toString(),
        answerId: 'answer-2',
        content: 'comment content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})