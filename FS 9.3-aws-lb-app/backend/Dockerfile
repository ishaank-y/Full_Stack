FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm i --omit=dev || npm i
COPY . .
EXPOSE 4000
CMD ["npm","start"]
