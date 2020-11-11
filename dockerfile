FROM node:12-slim

WORKDIR /var/app/
COPY package.json /var/app/package.json
COPY package-lock.json /var/app/package-lock.json
RUN npm i

COPY ./ /var/app/
RUN npm run build

CMD ["npm","run","tracker-push"]