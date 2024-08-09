import Fastify, { FastifyInstance, FastifyRequest, FastifyReply, FastifySchema } from 'fastify'
import multer from 'fastify-multer'
import { IHttpAdapter } from '../../@shared/adapters/http/IHttpAdapter'
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

interface RouteOptions {
  schema?: FastifySchema;
  preHandler?: any;
}

export class FastifyAdapter implements IHttpAdapter {
  private app: FastifyInstance
  private upload: any

  constructor() {
    this.app = Fastify({
      logger: true
    })

    this.upload = multer({ dest: 'uploads/' })

    // Registrar o plugin multer
    this.app.register(this.upload.contentParser)

     // Registrar o plugin Swagger
     this.app.register(swagger, {
      swagger: {
        info: {
          title: 'API Documentation',
          description: 'API documentation for the text converter service',
          version: '1.0.1',
        },
        consumes: ['application/json'],
        produces: ['application/json'],
      }
    });

    // Registrar o plugin Swagger UI
    this.app.register(swaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      uiHooks: {
        onRequest: function (request, reply, next) { next(); },
        preHandler: function (request, reply, next) { next(); }
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
    });

    // Middleware para validar o ciclo de vida das requisições
    this.app.addHook('onRequest', (request, reply, done) => {
      request.log.info({ req: request }, 'Request received')
      done()
    })

    this.app.addHook('preHandler', (request, reply, done) => {
      request.log.info({ req: request }, 'Handling request')
      done()
    })

    this.app.addHook('onSend', (request, reply, payload, done) => {
      request.log.info({ req: request, payload }, 'Response being sent')
      done()
    })

    this.app.addHook('onResponse', (request, reply, done) => {
      request.log.info({ res: reply }, 'Response sent')
      done()
    })
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
      }

      const result = await handler(data)
      reply.status(result.statusCode).send({
        statusCode: result.statusCode,
        body: result.body
      })
    } catch (error: any) {
      req.log.error('Error processing request:', error)

      if (error && error.body && error.statusCode) {
        reply.status(error.statusCode).send({
          statusCode: error.statusCode,
          body: error.body
        })
      } else {
        reply.status(500).send({
          statusCode: 500,
          body: 'Internal Server Error'
        })
      }
    }
  }

  public postFile(path: string, handler: (data: any) => Promise<any>, options: RouteOptions = {}) {
    this.app.post(path, {
      preHandler: options.preHandler || this.upload.single('file'),
      schema: options.schema
    }, (req, reply) => this.handleRequest(handler, req, reply));
  }
  
  public post(path: string, handler: (data: any) => Promise<any>, options: RouteOptions = {}) {
    this.app.post(path, {
      preHandler: options.preHandler,
      schema: options.schema
    }, (req, reply) => this.handleRequest(handler, req, reply));
  }
  
  public get(path: string, handler: (data: any) => Promise<any>, options: RouteOptions = {}) {
    this.app.get(path, {
      preHandler: options.preHandler,
      schema: options.schema
    }, (req, reply) => this.handleRequest(handler, req, reply));
  }
  
  public delete(path: string, handler: (data: any) => Promise<any>, options: RouteOptions = {}) {
    this.app.delete(path, {
      preHandler: options.preHandler,
      schema: options.schema
    }, (req, reply) => this.handleRequest(handler, req, reply));
  }
  
  public put(path: string, handler: (data: any) => Promise<any>, options: RouteOptions = {}) {
    this.app.put(path, {
      preHandler: options.preHandler,
      schema: options.schema
    }, (req, reply) => this.handleRequest(handler, req, reply));
  }

  public listen(port: number, callback?: any) {
    this.app.listen({ port: port, host: '0.0.0.0' }, callback);
  }

  public registerRoutes(prefix: string, routes: (app: FastifyInstance) => void) {
    this.app.register(routes, { prefix });
  }
}
