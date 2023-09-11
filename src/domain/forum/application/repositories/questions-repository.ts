import { Question } from '@/domain/forum/enterprise/entities'

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(answer: Question): Promise<void>
}
