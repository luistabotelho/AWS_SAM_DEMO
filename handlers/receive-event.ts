import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { randomUUID } from "crypto";
import { S3Service } from "../services/s3.service";
import { DBService } from "../services/db.service";
import { Event } from "../interfaces/event.model";

export const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
    let fileName = event.queryStringParameters?.["fileName"]
    let data = event.body
    if (!data || !fileName) {
        return {
            statusCode: 500,
            body: "Bad Request"
        }
    }
    const s3Service = new S3Service()
    const dbService = new DBService()
    await s3Service.putReceivedItem(fileName, data)
    let dbEvent: Event = {
        PK: randomUUID(),
        event: "Received",
        fileName: fileName,
        date: new Date()
    }
    await dbService.putEvent(dbEvent)
    return {
        statusCode: 200,
        body: "Ok"
    }
}