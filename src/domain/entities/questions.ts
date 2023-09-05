import { randomUUID } from "node:crypto"

interface QuestionsProps {
  title: string
  content: string
  authorId: string
  id?: string
}

export class Question {
  public title: string
  public content: string
  public id: string
  public authorId: string

  constructor({ authorId, content, title, id = randomUUID() }: QuestionsProps) {
    this.id = id
    this.title = title
    this.content = content
    this.authorId = authorId
  }
}