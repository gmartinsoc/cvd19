# NEE

Template project to develop with NodeJs + Express + EJS(Template Engine)



## How to run

in both cases first run `npm install`

### Without docker

```bash
npm start
```

### With docker

Build you image

```bash
docker build -t <you-user-name>/node-web-app .
```

than run exposing port 80 to internet
```bash
docker run -p 80:3000 <you-user-name>/node-web-app
```
optionally you can change internal container port with the environment variable `PORT`
```bash
docker run -p 80:12345 -e "PORT=12345" <you-user-name>/node-web-app
```



## Reference

Tutorials

* https://nodejs.org/uk/docs/guides/nodejs-docker-webapp/

* https://imasters.com.br/front-end/criando-uma-api-node-em-10-passos-com-express-js
* https://www.codementor.io/@nulldreams/utilizando-a-engine-ejs-para-aplicacoes-em-nodejs-dok81l3si

// Gitignore
* https://www.gitignore.io/
