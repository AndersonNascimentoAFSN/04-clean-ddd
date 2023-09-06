import { Slug } from "./value-objects/slug"
import { Entity } from "../../core"

interface QuestionsProps {
  slug: Slug 
  title: string
  content: string
  authorId: string
}

export class Question extends Entity<QuestionsProps> {
  constructor(props: QuestionsProps, id?: string) {
    super(props, id)
  }
}