GeoNames Vue Example
=================================================

This project has a simple Vue.JS code that consumes the REST API [GeoNames API Mezzio/MongoDB](https://github.com/mariojrrc/geonames-api-mezzio).

It was already compiled using a read-only api key. Its resulting files are placed in `/dist` folder.

## Running the project
Option 1:
```
php -S 0.0.0.0:8081 -t dist/
```

Option 2:
```
npm install
```
```
npm run serve
```

### Rebuild to production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Live Demo
You can check the app running on Heroku by clicking [here](https://geonames-vue.herokuapp.com).

## Questions and Suggestions?
Drop me an [e-mail](mailto:mariojr.rcosta@gmail.com)
