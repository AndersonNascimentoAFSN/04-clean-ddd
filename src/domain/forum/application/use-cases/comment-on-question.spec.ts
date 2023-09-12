import { faker } from '@faker-js/faker'

import {
  InMemoryQuestionCommentsRepository,
  InMemoryQuestionsRepository,
} from 'test'
import { makeQuestion } from 'test/factories'
import { UniqueEntityID } from '@/core'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const commentContent = faker.lorem.text()

    const question = makeQuestion({})

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: commentContent,
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      commentContent,
    )
  })

  it('should not be able to comment if question not exists', async () => {
    const question = makeQuestion({
      id: new UniqueEntityID('question-1'),
      override: { authorId: new UniqueEntityID('author-1') },
    })

    await inMemoryQuestionsRepository.create(question)

    await expect(() =>
      sut.execute({
        authorId: question.authorId.toString(),
        questionId: 'question-2',
        content: 'comment content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
