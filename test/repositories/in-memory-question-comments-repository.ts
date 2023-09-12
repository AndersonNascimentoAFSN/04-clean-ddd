import { QuestionCommentsRepository } from '@/domain/forum/application/repositories'
import { QuestionComment } from '@/domain/forum/enterprise/entities'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
