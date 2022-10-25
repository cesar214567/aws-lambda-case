import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { expect} from 'chai';
import { handler } from '../index';

const event: APIGatewayProxyEvent = {
            body: JSON.stringify({
              card_number: 4111111111111111,
              cvv: 123,
              expiration_month: "1",
              expiration_year: "2024",
              email: "cesar.madera@gmail.com"
            }),
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            path: '/hello',
            pathParameters: {},
            httpMethod: "POST",
            queryStringParameters: {},
            requestContext: {
                accountId: '123456789012',
                apiId: '1234',
                authorizer: {},
                httpMethod: 'get',
                identity: {
                    accessKey: '',
                    accountId: '',
                    apiKey: '',
                    apiKeyId: '',
                    caller: '',
                    clientCert: {
                        clientCertPem: '',
                        issuerDN: '',
                        serialNumber: '',
                        subjectDN: '',
                        validity: { notAfter: '', notBefore: '' },
                    },
                    cognitoAuthenticationProvider: '',
                    cognitoAuthenticationType: '',
                    cognitoIdentityId: '',
                    cognitoIdentityPoolId: '',
                    principalOrgId: '',
                    sourceIp: '',
                    user: '',
                    userAgent: '',
                    userArn: '',
                },
                path: '/token24',
                protocol: 'HTTP/1.1',
                requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
                requestTimeEpoch: 1428582896000,
                resourceId: '123456',
                resourcePath: '/hello',
                stage: 'dev',
            },
            headers: {
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
              "Accept-Encoding": "gzip, deflate, sdch",
              "Accept-Language": "en-US,en;q=0.8",
              "Cache-Control": "max-age=0",
              "CloudFront-Forwarded-Proto": "https",
              "CloudFront-Is-Desktop-Viewer": "true",
              "CloudFront-Is-Mobile-Viewer": "false",
              "CloudFront-Is-SmartTV-Viewer": "false",
              "CloudFront-Is-Tablet-Viewer": "false",
              "CloudFront-Viewer-Country": "US",
              "Host": "1234567890.execute-api.us-east-1.amazonaws.com",
              "Upgrade-Insecure-Requests": "1",
              "User-Agent": "Custom User Agent String",
              "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)",
              "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==",
              "X-Forwarded-For": "127.0.0.1, 127.0.0.2",
              "X-Forwarded-Port": "443",
              "X-Forwarded-Proto": "https",
              "Authorization":"3fa5af3480620cc5e0052c0e439a09aa"
            },
            resource: '',
            stageVariables: {},
        }

describe('Unit test for app handler', function () {
    let token:string;
    it('verifies successful response to POST', async () => {

        const result: APIGatewayProxyResult = await handler(event);
        console.log (result);
        expect(result.statusCode).equals(200);
        expect(result.body).to.be.not.undefined;
        const parsedBody = JSON.parse(result.body);
        expect(parsedBody.token).to.be.not.undefined;
        token = parsedBody.token;
    });

    it('verifies successful response to GET', async () => {
        event.httpMethod = "GET"
        event.headers["Authorization"] = token;
        const data =  {
              card_number: 4111111111111111,
              cvv: 123,
              expiration_month: "1",
              expiration_year: "2024",
              email: "cesar.madera@gmail.com"
            }
        const result: APIGatewayProxyResult = await handler(event);
        console.log (result);
        expect(result.statusCode).equals(200);
        expect(result.body).to.be.not.undefined;
        const parsedBody = JSON.parse(result.body);
        expect(parsedBody.message.token).equals(token);
        expect(parsedBody.message.card_number).equals(data.card_number);
        expect(parsedBody.message.cvv).to.be.undefined;
        expect(parsedBody.message.expiration_month).equals(data.expiration_month);
        expect(parsedBody.message.email).equals(data.email);
    });

});
