import { Slug } from "./value-objects/slug"
import { Entity, Optional, UniqueEntityID } from "../../core"

interface QuestionsProps {
  slug: Slug
  title: string
  content: string
  bestAnswerId?: UniqueEntityID
  authorId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionsProps> {
  static create(props: Optional<QuestionsProps, 'createdAt'>, id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
    }, id)
    return question
  }
}
