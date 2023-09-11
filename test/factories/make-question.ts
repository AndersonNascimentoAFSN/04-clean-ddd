import { UniqueEntityID } from '@/core'
import { Question, QuestionProps } from '@/domain/forum/enterprise/entities'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

type MakeQuestionParams = {
  override: Partial<QuestionProps>
  slugText: string
}

export function makeQuestion({
  override = {},
  slugText = 'example-question',
}: MakeQuestionParams) {
  const question = Question.create({
    title: 'Example content',
    slug: Slug.create(slugText),
    content: 'Example question',
    authorId: new UniqueEntityID(),
    ...override,
  })

  return question
}
