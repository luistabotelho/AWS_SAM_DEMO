import S3, { GetObjectRequest, PutObjectRequest } from "aws-sdk/clients/s3";

export class S3Service {
    private s3 = new S3()
    private bucket = "aws-sam-demo-data-bucket"
    
    async putReceivedItem(fileName: string, data: string) {
        let request: PutObjectRequest = {
            Bucket: this.bucket,
            Key: `${S3Folders.Received}/${fileName}`,
            Body: data
        }
        await this.s3.putObject(request).promise()
    }

    async fetchItem(folder: S3Folders, fileName: string) {
        let request: GetObjectRequest = {
            Bucket: this.bucket,
            Key: `${folder}/${fileName}`
        }
        let data = await this.s3.getObject(request).promise().then(value => {
            return value.$response.data
        })
        return data
    }

    async putProcessed(fileName: string, data: string) {
        let request: PutObjectRequest = {
            Bucket: this.bucket,
            Key: `${S3Folders.Results}/${fileName}`,
            Body: data
        }
        await this.s3.putObject(request).promise()
    }
}

export enum S3Folders {
    Received = "Received",
    Results = "Results"
}