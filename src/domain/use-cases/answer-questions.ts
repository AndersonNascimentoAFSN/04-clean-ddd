import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  authorId: string
  content: string
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Answer {
    const answer = new Answer(content, instructorId, questionId)

    return answer
  }
}
