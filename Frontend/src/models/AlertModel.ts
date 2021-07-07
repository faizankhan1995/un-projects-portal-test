import { NotificationType } from "./NotificationModel";

export interface AlertModel {
  id: string,
  message: string;
  type: NotificationType;
}
