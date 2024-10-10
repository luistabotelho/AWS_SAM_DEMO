import { UUID } from "crypto"

export interface Event {
    PK: UUID
    event: string
    fileName: string
    date: Date
}