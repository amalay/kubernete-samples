FROM node:12.18.3

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]