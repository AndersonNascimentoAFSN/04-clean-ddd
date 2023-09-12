import { InMemoryAnswersRepository } from 'test'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories'
import { UniqueEntityID } from '@/core'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch  question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        override: {
          questionId: new UniqueEntityID('question-1'),
        },
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        override: {
          questionId: new UniqueEntityID('question-1'),
        },
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        override: {
          questionId: new UniqueEntityID('question-1'),
        },
      }),
    )

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i = i + 1) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          override: {
            questionId: new UniqueEntityID('question-1'),
          },
        }),
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
