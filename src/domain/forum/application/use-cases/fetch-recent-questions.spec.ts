import { InMemoryQuestionsRepository } from 'test'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch recent questions', async () => {
    vi.setSystemTime(new Date(2023, 0, 20))

    await inMemoryQuestionsRepository.create(makeQuestion({}))

    vi.setSystemTime(new Date(2023, 0, 18))

    await inMemoryQuestionsRepository.create(makeQuestion({}))

    vi.setSystemTime(new Date(2023, 0, 23))

    await inMemoryQuestionsRepository.create(makeQuestion({}))

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i = i + 1) {
      await inMemoryQuestionsRepository.create(makeQuestion({}))
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
