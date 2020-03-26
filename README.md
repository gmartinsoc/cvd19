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

or set the database connection string

```bash
docker run -p 80:12345 -e "MONGO_CONNECTION_STR=mongodb://user:password@host:port" <you-user-name>/node-web-app
```

### Using docker-compose

Edit `docker-compose.yml` file, and run on shell:


```bash
docker-compose build && docker-compose up
```



## Todo

- [ ] Set restart policy
- [ ] Protect secrets
- [ ] Protect database access
- [ ] Set monitoring tools



## Reference

Tutorials

* https://nodejs.org/uk/docs/guides/nodejs-docker-webapp/

* https://imasters.com.br/front-end/criando-uma-api-node-em-10-passos-com-express-js
* https://www.codementor.io/@nulldreams/utilizando-a-engine-ejs-para-aplicacoes-em-nodejs-dok81l3si

// Gitignore
* https://www.gitignore.io/
