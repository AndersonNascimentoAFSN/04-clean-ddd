import { Slug } from "./value-objects/slug"
import { Entity, UniqueEntityID } from "../../core"

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
}