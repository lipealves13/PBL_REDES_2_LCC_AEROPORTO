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

# Construir a aplicação React
RUN npm run build

# Servir a aplicação usando o servidor estático 'serve'
RUN npm install -g serve

# Expor a porta em que a aplicação será executada
EXPOSE 80

# Iniciar o servidor
CMD ["serve", "-s", "build", "-l", "80"]
