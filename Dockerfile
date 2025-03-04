
FROM node:22-alpine

WORKDIR /usr/src/app

ENV NODE_ENV development

COPY package*.json ./

RUN npm install --quiet --no-optional --no-found --loglevel=error

COPY . .

RUN npm install --quiet --no-optional --no-found --loglevel=error

# RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

