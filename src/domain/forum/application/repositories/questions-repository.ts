import { Question } from '@/domain/forum/enterprise/entities'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  create(answer: Question): Promise<void>
  delete(question: Question): Promise<void>
}
