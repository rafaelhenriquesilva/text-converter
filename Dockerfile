# Use a imagem do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código da aplicação para o container
COPY . .

# Rode o build da aplicação
RUN npm run build

# Exponha a porta que a aplicação irá utilizar
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
