import { ObjectId, Document } from "mongoose";

export interface IPaymentCard extends Document {
  _id?:ObjectId,
  card_number: number;
  cvv?: number;
  expiration_month: string;
  expiration_year: string;
  email: string;
  token?: string;
  expireAt?: Date;
}
