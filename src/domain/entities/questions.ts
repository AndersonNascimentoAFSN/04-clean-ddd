import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"

interface QuestionsProps {
  id?: string
  slug: Slug 
  title: string
  content: string
  authorId: string
}

export class Question {
  public id: string
  public slug: Slug
  public title: string
  public content: string
  public authorId: string

  constructor({ id = randomUUID(), slug, title, content, authorId }: QuestionsProps) {
    this.id = id
    this.slug = slug
    this.title = title
    this.content = content
    this.authorId = authorId
  }
}