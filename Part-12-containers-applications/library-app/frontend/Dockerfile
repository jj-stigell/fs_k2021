FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN REACT_APP_BACKEND_URL=http://localhost:4000/ npm run build

RUN npm install -g serve

CMD ["serve", "build"]