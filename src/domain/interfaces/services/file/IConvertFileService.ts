import { FieldLineDTO } from "../../../dtos/FieldLineDTO"

export interface IConvertFileService<T> {
    convertFileToJSON(fieldsLine: FieldLineDTO[]): Promise<string>
    parseData(data: string, fields: FieldLineDTO[]): Promise<T[]>
}
