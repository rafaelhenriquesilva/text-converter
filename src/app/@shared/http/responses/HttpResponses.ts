import { IHttpResponse } from "../IHttpResponse"

export const ok = (body: any) : IHttpResponse => {
  return {
    body,
    statusCode: 200
  }
}

export const badRequest = (body: any) : IHttpResponse => {
  return {
    body,
    statusCode: 400
  }
}