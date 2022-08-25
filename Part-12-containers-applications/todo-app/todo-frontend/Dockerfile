FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

RUN REACT_APP_BACKEND_URL=http://localhost:8080/api/ npm run build

RUN npm install -g serve

CMD ["serve", "build"]