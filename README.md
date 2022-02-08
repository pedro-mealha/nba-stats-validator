# Nba stats validator

![js](https://img.shields.io/badge/JavaScript-ECMAScript%202020-blue)
![npm](https://img.shields.io/badge/npm-8.4.1-blue)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/WeNeedThePoh/nba-stats-validator/graphs/commit-activity)
[![Netlify Status](https://api.netlify.com/api/v1/badges/affa3c9f-aff1-4f60-bbd3-0ace725bf778/deploy-status)](https://app.netlify.com/sites/nba-stats-validator/deploys)

***Live URL:*** <https://nbastats.app.pedromealha.dev>

***Tech stack***: HTML, CSS, vanilla JS, Bootstrap, Google Fonts, Google Icons, NPM, Webpack, Netlify, ESLINT

A small website to validate your own nba game statistics with nba.com statistics.

The way this works is, you upload you HTM file, the app will parse it and display it to you and then we will run the parse data against the nba.com data. If any player has a statistics incorrect we will highlight it and show you the correct value -- the one that nba.com has.

For now this only works with one specific file scheme. See [Examples](examples/).

## NBA data

To fetch the nba data we are using the nba data api `data.nba.com`. This is an old API and probably will be deprecated really soon, so we will migrate our code to use a newer API `nba.cloud.com`. This new API has more data than the old API.

Endpoints that we are using:

Fetch all games for a specific date.  
`{data}` format: %Y%m%d

```sh
https://data.nba.net/prod/v1/{date}/scoreboard.json
```

Fetch game data .  
`{data}`: format: %Y%m%d | e.g. `20210317`  
`{gameId}`: format: number | e.g. `12351234`

```sh
https://data.nba.net/prod/v1/{date}/{gameId}_boxscore.json
```

Fetch team logo SVG .  
`{teamId}`: format: number | e.g. `12351234`

```sh
https://cdn.nba.com/logos/nba/{teamId}/global/L/logo.svg
```

## Deployment

We are using netlify for hosting, we use github actions to make deployments. On github actions we use netlify CLI to trigger builds and deploy it to staging/production. Deployments to staging and production are different, so what we do is we build and deploy to staging, if everything is OK, when making a new release of the repo we re-deploy the staging build to production. The way to do it is by grabing the last deployment ID and just publish it to production on netlify.

For deployment configuration we keep it simple as the app does not require a lot of fancy things. We configure the build command and thats it

```sh
npm run build
```

Define the public directory to which we serve the static files and it's ready to go.

### Build

So why build a static site? First we don't need to serve all files to the browser and for the performance side we want our files to minimazed and obfuscated. We are already using a NGINX server to serve our files so we now can just push the build files to `/public` and we are good to go.

Initially we were using [Gulp](gulpjs.com) and it did work but the `gulpfile.js` started to be a big mess. Didn't do exactly what we were looking for that.

So we switch to [Webpack](https://webpack.js.org/) and it was the best thing we did. It's straigh foward and really easy to configure. We can use the build for production or development and just workds flawless.
Currently we are create the bundle with all the sourcemaps and minimafying and uglify all files -- html, css and js.

## Development

To get started clone the repo

```sh
git clone https://github.com/WeNeedThePoh/nba-stats-validator.git

cd nba-stats-validator
```

Install dependencies

```sh
npm install
```

Build Files

```sh
npm run build:dev
```

Start server

```sh
npm run serve
```

You can have automatic builds whenever a file is changed. This will make webpack watching file changes and trigger new builds.

```sh
npm run watch
```

To test the app use the files in the [`/examples dir`]('examples/').

## License

GPLv3 Licensed (file [LICENSE](LICENSE)).
