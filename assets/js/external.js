import * as config from './../../env.js'

export async function getGameMetadata (date, league, teams) {
  return httpGet(`${getApiBaseUrl()}/scoreboard?date=${date}&league=${league}`)
    .then(function (response) {
      if (response.games.length > 0) {
        const games = response.games.filter(game => {
          return game.away_team.tricode === teams[0].triCode || game.away_team.tricode === teams[1].triCode ||
            game.home_team.tricode === teams[0].triCode || game.home_team.tricode === teams[1].triCode
        })

        return {
          gameId: games[0].id,
          gameStartsAt: games[0].starts_at
        }
      }
    })
}

export async function getGameData (gameId) {
  return httpGet(`${getApiBaseUrl()}/boxscore?gameId=${gameId}`)
    .then(function (response) {
      return response
    })
}

export function getTeamLogo (teamId) {
  return getCdnBaseUrl() + `logos/nba/${teamId}/global/L/logo.svg`
}

function httpGet (url) {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest()
    client.open('GET', url)
    client.send()

    client.onreadystatechange = function () {
      if (this.readyState === this.DONE) {
        resolve(JSON.parse(this.responseText))
      }
    }
  })
}

function getApiBaseUrl () {
  return `${config.default.nba_api_base_url}/${config.default.nba_api_prefix}`
}

function getCdnBaseUrl () {
  return `${config.default.nba_cdn_base_url}/`
}
