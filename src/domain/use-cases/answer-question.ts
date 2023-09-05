import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  content: string
  questionId: string
  instructorId: string
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository,
  ) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Promise<Answer> {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId
    })


    await this.answersRepository.create(answer)

    return answer
  }
}
