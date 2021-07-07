
export enum NotificationType{
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info"
}
export interface NotificationModel {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
}
