export class ChatMessage {
  id?: string;
  sender: string;
  receiver: string;
  message?: string;
  status: string;
  timeSent: Date = new Date();
  type: string;
  files?: string[];

  updateType?: string;
  link?: string;
}
