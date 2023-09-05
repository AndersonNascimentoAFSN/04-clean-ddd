import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseRequest {
  content: string
  questionId: string
  instructorId: string
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Answer {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId
    })

    return answer
  }
}
