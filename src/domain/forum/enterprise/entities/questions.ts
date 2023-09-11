import dayjs from 'dayjs'

import { Slug } from './value-objects/slug'
import { Entity, Optional, UniqueEntityID } from '@/core'

export interface QuestionProps {
  slug: Slug
  title: string
  content: string
  bestAnswerId?: UniqueEntityID
  authorId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get slug() {
    return this.props.slug
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.update()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.update()
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.update()
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private update() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )
    return question
  }
}
