import { AnswersRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }
}
