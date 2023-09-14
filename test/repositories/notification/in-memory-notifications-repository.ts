import { Notification } from '@/domain/notification/enterprise/entities'
import { NotificationsRepository } from '@/domain/notification/application/repositories'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
