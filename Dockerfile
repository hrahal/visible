FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/

RUN yarn install --frozen-lockfile --ignore-platform --ignore-engines --quiet
COPY . /usr/src/app
EXPOSE 3000
CMD [ "yarn", "start" ]
