import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import multer from 'fastify-multer';
import { IHttpAdapter } from '../../@shared/adapters/http/IHttpAdapter';

export class FastifyAdapter implements IHttpAdapter {
  private app: FastifyInstance;
  private upload: any;

  constructor() {
    this.app = Fastify({
      logger: true
    });

    this.upload = multer({ dest: 'uploads/' });

    // Registrar o plugin multer
    this.app.register(this.upload.contentParser);

    // Middleware para validar o ciclo de vida das requisições
    this.app.addHook('onRequest', (request, reply, done) => {
      request.log.info({ req: request }, 'Request received');
      done();
    });

    this.app.addHook('preHandler', (request, reply, done) => {
      request.log.info({ req: request }, 'Handling request');
      done();
    });

    this.app.addHook('onSend', (request, reply, payload, done) => {
      request.log.info({ req: request, payload }, 'Response being sent');
      done();
    });

    this.app.addHook('onResponse', (request, reply, done) => {
      request.log.info({ res: reply }, 'Response sent');
      done();
    });
  }

  private async handleRequest(
    handler: (data: any) => Promise<any>,
    req: FastifyRequest | any,
    reply: FastifyReply
  ) {
    try {
      const data = {
        ...req.query as any,
        ...req.body as any,
        ...req.params as any,
        file: req.file
      };

      const result = await handler(data);
      reply.status(result.statusCode).send({
        statusCode: result.statusCode,
        body: result.body
      });
    } catch (error: any) {
      req.log.error('Error processing request:', error);

      if (error && error.body && error.statusCode) {
        reply.status(error.statusCode).send({
          statusCode: error.statusCode,
          body: error.body
        });
      } else {
        reply.status(500).send({
          statusCode: 500,
          body: 'Internal Server Error'
        });
      }
    }
  }

  public postFile(path: string, handler: (data: any) => Promise<any>) {
    this.app.post(path, { preHandler: this.upload.single('file') }, (req, reply) => this.handleRequest(handler, req, reply));
  }

  public post(path: string, handler: (data: any) => Promise<any>) {
    this.app.post(path, (req, reply) => this.handleRequest(handler, req, reply));
  }

  public get(path: string, handler: (data: any) => Promise<any>) {
    this.app.get(path, (req, reply) => this.handleRequest(handler, req, reply));
  }

  public delete(path: string, handler: (data: any) => Promise<any>) {
    this.app.delete(path, (req, reply) => this.handleRequest(handler, req, reply));
  }

  public put(path: string, handler: (data: any) => Promise<any>) {
    this.app.put(path, (req, reply) => this.handleRequest(handler, req, reply));
  }

  public listen(port: number, callback?: any) {
    this.app.listen({ port: port, host: '0.0.0.0' }, callback);
  }

  public registerRoutes(prefix: string, routes: (app: FastifyInstance) => void) {
    this.app.register(routes, { prefix });
  }
}
