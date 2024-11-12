# Usar uma imagem base do Node.js
FROM node:14

# Criar diretório de trabalho na imagem
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta em que a aplicação será executada
EXPOSE 3103

# Iniciar a aplicação
CMD ["npm", "start"]
