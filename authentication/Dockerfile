FROM node:latest

WORKDIR .

COPY /package.json ./

COPY . .

RUN npm install --production

EXPOSE 4000

CMD [ "npm", "start" ]