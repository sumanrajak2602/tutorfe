export interface Notification {
  id: string;
  title: string;
  message: string;
  payload: Record<string, unknown>;
}

export interface NotificationResponse {
  status: 'accepted' | 'declined';
  timestamp: Date;
  additionalData?: Record<string, unknown>;
}