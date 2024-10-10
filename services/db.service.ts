import { DynamoDB } from "aws-sdk";
import { Event } from "../interfaces/event.model";
import { PutItemInput, PutItemInputAttributeMap, QueryInput, ScanInput } from "aws-sdk/clients/dynamodb";

export class DBService {
    private dynamoDB = new DynamoDB()

    async putEvent(event: Event) {
        let dbItem: PutItemInputAttributeMap = {
            PK: {
                S: event.PK
            },
            event: {
                S: event.event
            },
            fileName: {
                S: event.fileName
            },
            date: {
                N: event.date.getTime().toString()
            }
        }
        let request: PutItemInput = {
            TableName: Tables.Events,
            Item: dbItem
        }
        await this.dynamoDB.putItem(request).promise()
    }

    async getEventsByDate(date: Date) {
        let startDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()).getTime()
        let endDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()+1).getTime()
        let query: QueryInput = {
            TableName: Tables.Events,
            FilterExpression: `date BETWEEN ${startDate} AND ${endDate}`
        }
        let result = await this.dynamoDB.query(query).promise().then((value) => {
            return value.$response.data
        })
        return result
    }
}

enum Tables {
    Events = "Events"
}