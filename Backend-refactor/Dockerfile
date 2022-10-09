
ARG NODE_VERSION=18.10.0
FROM node:${NODE_VERSION}-alpine as pkg-base
WORKDIR /usr/src/app
COPY .env ./
COPY package*.json ./
RUN npm install

COPY . .
#RUN npm install && \
#    npm i -g pkg && \
#    pkg . --targets node12-alpine-x64 


#FROM node:${NODE_VERSION}-alpine
#WORKDIR /usr/src/app
#COPY --from=pkg-base /usr/src/app/viiomodule .
#COPY --from=pkg-base /usr/src/app/key ./key
#COPY --from=pkg-base /usr/src/app/.env .

#RUN chmod +x ./viiomodule

EXPOSE 5000
CMD [ "node", "app.js" ]