# Nba stats validator
![js](https://img.shields.io/badge/JavaScript-ECMAScript%202020-blue) ![npm](https://img.shields.io/badge/npm-7.6.3-blue) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)


***Live URL:*** https://nba-stats-validator.herokuapp.com  

***Tech tack***: HTML, CSS, vanilla JS, Bootstrap, Google Fonts, Google Icons, NPM, Webpack, Heroku, ESLINT

A small website to validate your own nba game statistics with nba.com statistics.

The way this works is, you upload you HTM file, the app will parse it and display it to you and then we will run the parse data against the nba.com data. If any player has a statistics incorrect we will highlight it and show you the correct value -- the one that nba.com has.

For now this only works with one specific file scheme. See [Examples](examples/).

## NBA data

To fetch the nba data we are using the nba data api `data.nba.com`. This is an old API and probably will be deprecated really soon, so we will migrate our code to use a newer API `nba.cloud.com`. This new API has more data than the old API.

Endpoints that we are using:

Fetch all games for a specific date.  
`{data}` format: %Y%m%d
```
https://data.nba.net/prod/v1/{date}/scoreboard.json
```

Fetch game data .  
`{data}`: format: %Y%m%d | e.g. `20210317`  
`{gameId}`: format: number | e.g. `12351234`
```
https://data.nba.net/prod/v1/{date}/{gameId}_boxscore.json
```

Fetch team logo SVG .  
`{teamId}`: format: number | e.g. `12351234`
```
https://cdn.nba.com/logos/nba/{teamId}/global/L/logo.svg
```

# Deployment

We are using heroku for hosting, so we have heroku directly connect to github, so every time we push to `main` we will trigger a new deploy to production. With this we have a true CI/CD deployment strategy, so whenever we push something is going straigh to production.

We are using two buildpacks from heroku:

### NodeJs  
```
https://github.com/heroku/heroku-buildpack-nodejs
```
This is only to build our app to be production ready. This will install npm and run `npm run build` which we will talk in bit.

### Static
```
https://github.com/heroku/heroku-buildpack-static
```

This is just to serve the static files, what this does is spawn a NGINX server and serves by default the public directory. For this we have the config file `/static.json`.

## Build

So why build a static site? First we don't need to serve all files to the browser and for the performance side we want our files to minimazed and obfuscated. We are already using a NGINX server to serve our files so we now can just push the build files to `/public` and we are good to go.

Initially we were using [Gulp](gulpjs.com) and it did work but the `gulpfile.js` started to be a big mess. Didn't do exactly what we were looking for that.

So we switch to [Webpack](https://webpack.js.org/) and it was the best thing we did. It's straigh foward and really easy to configure. We can use the build for production or development and just workds flawless.
Currently we are create the bundle with all the sourcemaps and minimafying and uglify all files -- html, css and js.

# Development

To get started clone the repo
```
git clone https://github.com/WeNeedThePoh/nba-stats-validator.git

cd nba-stats-validator
```

Install dependencies
```
npm install
```

Build Files
```
npm run build:dev
```

Start server
```
npm run serve
```

You can have automatic builds whenever a file is changed. This will make webpack watching file changes and trigger new builds.
```
npm run watch
```

To test the app use the files in the [`/examples dir`]('examples/').

# License

GPLv3 Licensed (file [LICENSE](LICENSE)).
