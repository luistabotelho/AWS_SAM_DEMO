import { Handler, S3Event } from "aws-lambda";
import { S3Folders, S3Service } from "../services/s3.service";
import { Body } from "aws-sdk/clients/s3";
import { DBService } from "../services/db.service";
import { Event } from "../interfaces/event.model";
import { randomUUID } from "crypto";

export const handler: Handler<S3Event> = async (event) => {
    const s3Service = new S3Service()
    const dbService = new DBService()
    for (let record of event.Records) {
        let key_list = record.s3.object.key.split('/')
        let fileName = key_list[key_list.length - 1]
        let received = await s3Service.fetchItem(S3Folders.Received, fileName)
        if (!received || !received.Body) {
            continue
        }
        let processed = processResult(received.Body)
        await s3Service.putProcessed(fileName, processed)
        let dbEvent: Event = {
            PK: randomUUID(),
            event: "Processed",
            fileName,
            date: new Date()
        }
        await dbService.putEvent(dbEvent)
    }
}

function processResult(raw: Body) {
    let rawObject = JSON.parse(raw.toString())
    let processed = {
        Keys: Object.keys(rawObject).join(),
        Values: Object.values(rawObject).join()
    }
    return JSON.stringify(processed)
}