import { Question } from '@/domain/forum/enterprise/entities'

export interface QuestionsRepository {
  create(answer: Question): Promise<void>
}
