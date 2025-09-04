export interface User {
  _id: string;
  username: string;
  online?: boolean;
}

export interface Message {
  _id?: string;
  conversationId: string;
  from: string;
  to: string;
  text: string;
  createdAt?: string;
}
