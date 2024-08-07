export interface IHttpAdapter {
    postFile(path: string, handler: (data: any) => Promise<any>): void;
    post(path: string, handler: (data: any) => Promise<any>): void;
    get(path: string, handler: (data: any) => Promise<any>): void;
    delete(path: string, handler: (data: any) => Promise<any>): void;
    put(path: string, handler: (data: any) => Promise<any>): void;
    listen(port: number, callback?: () => void): void;
}