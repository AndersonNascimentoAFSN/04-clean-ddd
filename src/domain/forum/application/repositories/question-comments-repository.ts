import { QuestionComment } from '@/domain/forum/enterprise/entities'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}
