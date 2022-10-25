import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {PaymentCardService} from './services/payment-card.service'
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
      if (event.httpMethod.toString().toLowerCase() =='get'){
        response = await PaymentCardService.handleGet(event);
      }else if(event.httpMethod.toString().toLowerCase() =='post'){
        response = await PaymentCardService.handlePost(event);
      }else{
        throw new Error('Not valid method')
      }
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }

    return response;
};
