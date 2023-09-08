import { UniqueEntityID } from "@/core"
import { Answer } from "../entities"
import { AnswersRepository } from "../repositories"

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
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId)
    })


    await this.answersRepository.create(answer)

    return answer
  }
}
