FROM node:latest

WORKDIR /app/

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 9093

CMD ["npm", "run", "start"]
