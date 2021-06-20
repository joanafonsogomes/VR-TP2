FROM node:latest
WORKDIR .
COPY /package*.json ./
RUN npm install --production
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]