import { UniqueEntityID } from '@/core'
import { Answer } from '@/domain/forum/enterprise/entities'
import { AnswersRepository } from '@/domain/forum/application/repositories'

interface AnswerQuestionUseCaseRequest {
  content: string
  questionId: string
  instructorId: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
