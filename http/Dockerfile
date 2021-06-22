FROM node:latest

WORKDIR .

COPY /package.json ./

COPY . .

RUN npm install --production

EXPOSE 4004

CMD [ "npm", "start" ]