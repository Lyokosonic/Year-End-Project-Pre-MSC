FROM node:10

RUN mkdir -p /usr/src/application/

WORKDIR /usr/src/application

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]