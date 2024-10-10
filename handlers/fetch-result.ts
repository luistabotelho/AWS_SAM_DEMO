import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { S3Folders, S3Service } from "../services/s3.service";

export const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
    let fileName = event.queryStringParameters?.["fileName"]
    if (!fileName) {
        return {
            statusCode: 500,
            body: "Bad Request"
        }
    }
    const s3Service = new S3Service()
    let result = await s3Service.fetchItem(S3Folders.Results, fileName)
    if (!result || !result.Body) {
        return {
            statusCode: 404,
            body: "Not Found"
        }
    }
    return {
        statusCode: 200,
        body: result.Body.toString()
    }
}