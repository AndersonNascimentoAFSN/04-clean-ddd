import { AnswersRepository } from '@/domain/forum/application/repositories'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {}
  }
}
