# Text-Convert

**Text-Convert** é uma ferramenta poderosa para migrar bases de dados antigas para novos formatos. Recebendo arquivos `.txt` como entrada, ele converte os dados com base em distâncias predeterminadas e os insere em um banco de dados. Projetado com foco em escalabilidade e flexibilidade, o Text-Convert permite adaptação rápida a diferentes modelos de arquivos apenas modificando o arquivo de entrada.

O projeto segue os princípios de **Arquitetura Hexagonal**, **Domain-Driven Design (DDD)**, e **Clean Code**, garantindo uma base sólida para desenvolvimento contínuo e fácil manutenção.

## Funcionalidades

- **Conversão de Arquivos `.txt`**: Converte dados de arquivos `.txt` em registros no banco de dados, com base em distâncias predeterminadas.
- **Listagem de Registros**: API que lista os registros inseridos no banco de dados.
- **Escalabilidade**: Suporte para diferentes formatos de arquivos `.txt`, permitindo fácil adaptação ao modificar as distâncias no arquivo de entrada.
- **Flexibilidade**: A arquitetura permite a integração de novos modelos de dados sem modificar a estrutura central do código.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [npm](https://www.npmjs.com/) (versão 6.x ou superior)

## Arquitetura

O projeto Text-Convert foi desenvolvido seguindo a **Arquitetura Hexagonal** para garantir a independência entre as camadas da aplicação e facilitar futuras expansões.

### Estrutura de Pastas

- **/src**: Código-fonte da aplicação.
  - **/app**: Casos de uso e regras de negócio.
  - **/domain**: Entidades e interfaces do domínio.
  - **/infra**: Implementação de repositórios, serviços externos e configurações de infraestrutura.

### Fluxo de Dados

O fluxo de dados na aplicação segue o princípio de que as entradas e saídas (adapters) são independentes do núcleo da aplicação (domínio e aplicação). Isso permite a fácil integração de novos métodos de entrada (como novas rotas ou interfaces de usuário) ou saída (como novos tipos de bancos de dados) sem afetar as regras de negócio.

#### Domain-Driven Design (DDD)

A aplicação é organizada em torno dos conceitos do **DDD**, separando as responsabilidades em camadas bem definidas:

- **Entities**: Representam os objetos de domínio com comportamento.
- **Repositories**: Definem as interfaces para acesso a dados, isolando a aplicação da tecnologia de persistência.
- **Use Cases**: Implementam a lógica de negócio específica da aplicação, orquestrando a interação entre as entidades e repositórios.

## Instalação

### Configuração dos Arquivos de Ambiente

Já existem duas conexões pré-configuradas no Docker para a aplicação. No entanto, sinta-se à vontade para modificar as variáveis nos arquivos `.env` e `.env_test` conforme necessário.

### Instalar as dependências

```bash
npm i
```


### Iniciar o Docker

Para construir e iniciar os containers Docker, execute:

```bash
docker compose up --build
```

### Executar as Migrations
 - Se for a primeira vez que você está acessando o banco de dados, rode as migrations para criar as tabelas necessárias:
```
    npm run migration:up
```

### Executar os testes
 - Garanta que as credenciais do banco de dados para testes estejam configuradas no .env_test
```
    npm run test
```
