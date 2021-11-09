FROM mhart/alpine-node:16

WORKDIR /app

COPY . .

RUN npm ci --prod

CMD ["npm", "start"]
