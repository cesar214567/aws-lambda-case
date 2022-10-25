import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { connectToDatabase} from '../database/client/mongo-client'
import { IPaymentCard } from '../database/interfaces/payment-card.interface';
import {cardNumberValidator,
  cvvValidator,
  expirationMonthValidator,
  expirationYearValidator,
emailValidator} from '../database/validations/payment-card.validation'
import crypto from "crypto";

export class PaymentCardService {

  static validates(paymentCard:IPaymentCard){
    const validators = [
      cardNumberValidator,
      cvvValidator,
      expirationMonthValidator,
      expirationYearValidator,
      emailValidator]
    return validators.every((validator) => validator(paymentCard));
  }

  static async handlePost(event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if (event.body === null || event.body === undefined) {
      throw new Error('body was not sent');
    }
    const parsedEvent = JSON.parse(JSON.stringify(event));
    const {
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email} = JSON.parse(parsedEvent.body);
    const token = crypto.randomBytes(16).toString('hex');
    const body = {
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email,
      token:token,
      expireAt: new Date(Date.now())
    } as IPaymentCard;
    const db = await connectToDatabase();
    if( !this.validates(body)){
      throw new Error('There has been some missing validations');
    }
    const paymentCard = JSON.parse(JSON.stringify(body));

    db.collection('paymentcards').insertOne(paymentCard);
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({
            token: paymentCard.token,
        }),
    };
    return response;
  }

  static async handleGet(event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if (event.body === null || event.body === undefined) {
      throw new Error('body was not sent');
    }
    const eventParsed = JSON.parse(JSON.stringify(event));

    const token:string = eventParsed.headers.Authorization;
    const db = await connectToDatabase();
    const paymentCardDoc = await db.collection('paymentcards').findOne({token:token});
    let paymentCardReturn;
    if (paymentCardDoc!==null) {
      const returnPaymentcard = JSON.parse(JSON.stringify(paymentCardDoc))
      const {_id,cvv, ...returnValue} = returnPaymentcard;
      paymentCardReturn = returnValue;
    }

    const response: APIGatewayProxyResult = {
        statusCode: paymentCardDoc === null? 404 : 200,
        body: JSON.stringify({
            message: paymentCardDoc === null? "no matching token or already expired" :paymentCardReturn,
        }),
    };
    return response;
  }
/*
static async handleGetSimple(){

    const token:string = "3fa5af3480620cc5e0052c0e439a09ab";
    const db = await connectToDatabase();
    const paymentCardDoc = await db.collection('paymentcards').findOne({token:token},{});
    const returnPaymentcard = JSON.parse(JSON.stringify(paymentCardDoc))
    console.log(returnPaymentcard);
    let paymentCardReturn;
    if (paymentCardDoc!==null) {
      const returnPaymentcard = JSON.parse(JSON.stringify(paymentCardDoc))
      const {_id,cvv, ...returnValue} = returnPaymentcard;
      paymentCardReturn = returnValue;
    }
    const response: APIGatewayProxyResult = {
        statusCode: returnPaymentcard === null? 404 : 200,
        body: JSON.stringify({
            message: returnPaymentcard === null? "no matching token or already expired" :paymentCardReturn,
        }),
    };
    console.log(response);
    return response;
  }
*/
}
