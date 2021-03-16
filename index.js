window.onload = () => {
  const openFileBtn = document.getElementById('open-file-btn')

  const input = document.createElement('input')
  input.type = 'file'

  openFileBtn.onclick = () => {
    input.click()
  }

  input.onchange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file, 'utf16le')

    reader.onload = readerEvent => {
      const fileData = readerEvent.target.result
      parseFileHtml(fileData)
    }
  }

  function parseFileHtml (fileData) {
    const parser = new DOMParser()
    const html = parser.parseFromString(fileData, 'text/html')

    const tables = html.querySelectorAll('table')

    const gameInfoTable = tables[0]
    const scoreboardTable = tables[1]
    const teamOnePlayersTable = tables[2]
    const teamTwoPlayersTable = tables[3]

    const teams = getTeams(gameInfoTable)

    const parsedData = {
      startsAt: getGameTime(gameInfoTable),
      location: getGameLocation(gameInfoTable),
      teams: teams,
      scoreboard: getScoreboard(scoreboardTable, teams),
      players: getPlayers(teamOnePlayersTable, teamTwoPlayersTable)
    }

    document.getElementById('open-file-btn').style.display = 'none'
    document.getElementById('content').style.display = 'block'
    document.getElementById('content').innerHTML = fileData
  }

  function getTeamTriCode (team) {
    const exceptions = [
      { name: 'Golden State', triCode: 'GSW' },
      { name: 'Los Angeles', triCode: 'LAC' },
      // {name: 'Los Angeles', triCode: 'LAL'},
      { name: 'New York', triCode: 'NYK' },
      { name: 'New Orleans', triCode: 'NOP' },
      { name: 'Oklahoma City', triCode: 'OKC' },
      { name: 'Brooklyn', triCode: 'BKN' },
      { name: 'San Antonio', triCode: 'SAS' },
      { name: 'Phoenix', triCode: 'PHX' },
      { name: 'Washington', triCode: 'WSH' }
    ]

    let triCode = team.substring(0, 3)

    const teamException = exceptions.filter(exception => exception.name === team)
    if (teamException.length > 0) {
      triCode = teamException[0].triCode
    }

    return {
      name: team.toLowerCase(),
      triCode: triCode.toUpperCase()
    }
  }

  function getTeams (gameInfoTable) {
    let teams = gameInfoTable.querySelectorAll('tr')[1].firstElementChild.textContent
    teams = teams.split(' Vs ')
    return teams.map(getTeamTriCode)
  }

  function getGameTime (gameInfoTable) {
    const gameLocationAndTime = gameInfoTable.querySelectorAll('tr')[2].firstElementChild.textContent

    let gameDateTime
    [gameDateTime] = gameLocationAndTime.split(' at ')

    const timestamp = Date.parse(gameDateTime)
    gameDateTime = new Date(timestamp)

    return gameDateTime
  }

  function getGameLocation (gameInfoTable) {
    const gameLocationAndTime = gameInfoTable.querySelectorAll('tr')[2].firstElementChild.textContent
    let gameLocation
    [, gameLocation] = gameLocationAndTime.split(' at ')

    return gameLocation
  }

  function getScoreboard (scoreboardTable, teams) {
    const scoreboard = { [teams[0].name]: {}, [teams[1].name]: {} }

    for (const [i, team] of teams.entries()) {
      const teamScore = scoreboardTable.querySelectorAll('tr')[i + 1].children
      const gameLength = teamScore.length

      scoreboard[team.name].firstP = teamScore[2].textContent

      if (gameLength == 5) {
        scoreboard[team.name].secondP = undefined
        scoreboard[team.name].thirdP = undefined
        scoreboard[team.name].final = teamScore[4].textContent
      } else if (gameLength == 7) {
        scoreboard[team.name].secondP = teamScore[4].textContent
        scoreboard[team.name].thirdP = undefined
        scoreboard[team.name].final = teamScore[6].textContent
      } else {
        scoreboard[team.name].secondP = teamScore[4].textContent
        scoreboard[team.name].thirdP = teamScore[6].textContent
        scoreboard[team.name].final = teamScore[8].textContent
      }
    }

    return scoreboard
  }

  function getPlayers (teamOnePlayersTable, teamTwoPlayersTable) {
  }
}
