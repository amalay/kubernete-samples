FROM node:12.18.3

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

ENV MYSQL_HOST=localhost
ENV NODE_LOCAL_PORT=5000
ENV NODE_DOCKER_PORT=5000
ENV MYSQL_LOCAL_PORT=3306
ENV MYSQL_DOCKER_PORT=3306
ENV MYSQL_ROOT_USER=root
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=testdb

EXPOSE 5000

CMD ["node", "server.js"]