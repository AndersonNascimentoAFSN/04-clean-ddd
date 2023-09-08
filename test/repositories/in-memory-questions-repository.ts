import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }
}
