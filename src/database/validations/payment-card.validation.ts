import luhn from "luhn";
import {validateLength} from './utils/length_validator'
import {validateMinMaxNumber} from './utils/min_max_validator'
import {validateEmails} from './utils/email_validator'
import {IPaymentCard} from '../interfaces/payment-card.interface'
import {checkExist} from './utils/existance_validator'
//utils
const checkLUHN = (creditCard:number) => {
  return  luhn.validate(creditCard.toString());
}

//validators
export const cardNumberValidator = (paymentCard:IPaymentCard) => {
  return checkExist(paymentCard.card_number) && checkLUHN(paymentCard.card_number) && validateLength(paymentCard.card_number,13,16);
}

export const cvvValidator = (paymentCard:IPaymentCard) => {
  return checkExist(paymentCard.cvv) && validateLength(paymentCard.cvv,3,4);
}

export const expirationMonthValidator = (paymentCard:IPaymentCard) => {
  return checkExist(paymentCard.expiration_month) && validateLength(paymentCard.expiration_month,1,2) && validateMinMaxNumber(paymentCard.expiration_month,1,12);
}

export const expirationYearValidator = (paymentCard:IPaymentCard) => {
  const actualYear = new Date().getFullYear();
  const maxYear = actualYear + 5;
  return checkExist(paymentCard.expiration_year) && validateLength(paymentCard.expiration_year,4,4) &&
    validateMinMaxNumber(paymentCard.expiration_year,actualYear,maxYear);
}
export const emailValidator = (paymentCard:IPaymentCard) => {
  return checkExist(paymentCard.email) && validateLength(paymentCard.email,5,100) && validateEmails(paymentCard.email);
}
