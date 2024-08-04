import { FieldLineDTO } from "../../../dtos/FieldLineDTO"

export interface IConvertFileService<T> {
    convertFileToJSON(fieldsLine: FieldLineDTO[], lineLenght: number): Promise<string>
    parseData(data: string, fields: FieldLineDTO[], lineLength: number): Promise<T[]>
}
