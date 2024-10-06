import { APIGatewayProxyCallbackV2, APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { PutItemInputAttributeMap } from "aws-sdk/clients/dynamodb";
import { randomUUID } from "crypto";

export const handler: Handler = async (event: APIGatewayProxyEventV2, context, callback: APIGatewayProxyCallbackV2): Promise<APIGatewayProxyResultV2> => {
    try {
        console.log("Started")
        const tableName = "Events"
        const db = new DynamoDB()
        let item: PutItemInputAttributeMap = {
            "PK": {S: randomUUID()},
            "date": {S: new Date().toISOString()}
        }
        await db.putItem({TableName: tableName, Item: item}).promise()
        console.log("PUT")
        let promiseResult = await db.scan({TableName: tableName, Limit: 100}).promise()
        console.log("QUERY")
        if (promiseResult.$response.error) {
            return {
                statusCode: 500,
                body: "Internal Server Error"
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify(promiseResult.$response.data)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: error.message
        }
    }
}