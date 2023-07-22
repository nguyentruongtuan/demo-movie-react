FROM node:16-alpine AS buildstep

WORKDIR /app

COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json
COPY package-lock.json ./package-lock.json
COPY tailwind.config.js ./tailwind.config.js

RUN npm ci

COPY ./src ./src
COPY ./public ./public
RUN npm run build 

FROM buildstep
WORKDIR /app
COPY --from=buildstep /app/package.json /app/package.json
COPY --from=buildstep /app/package-lock.json /app/package-lock.json
COPY --from=buildstep /app/build /app/build


CMD [ "npm", "start" ]