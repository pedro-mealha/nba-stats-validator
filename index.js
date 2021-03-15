window.onload = () => {
    var openFileBtn = document.getElementById('open-file-btn');

    var input = document.createElement('input');
    input.type = 'file';

    openFileBtn.onclick = () => {
        input.click();
    }

    input.onchange = e => { 
        var file = e.target.files[0]; 
        var reader = new FileReader();
        reader.readAsText(file,'utf16le');

        reader.onload = readerEvent => {
            var fileData = readerEvent.target.result;
            parseFileHtml(fileData)
        }
    }

    function parseFileHtml(fileData) {
        var parser = new DOMParser();
        var html = parser.parseFromString(fileData, 'text/html');

        let tables = html.querySelectorAll('table')

        let gameInfoTable = tables[0]
        let gameLocationAndTime = gameInfoTable.querySelectorAll('tr')[2].firstElementChild.textContent
        let gameDateTime, gameLocation
        [gameDateTime, gameLocation] = gameLocationAndTime.split(' at ')

        let teams = gameInfoTable.querySelectorAll('tr')[1].firstElementChild.textContent
        teams = teams.split(" Vs ")
        teams = teams.map(getTeamTriCode)

        parsedData = {
            startsAt: gameDateTime,
            location: gameLocation,
            teams: teams
        }

        console.log(parsedData)

        // document.getElementById('content').style.display = 'block';
        // document.getElementById('content').innerHTML = fileData;
    }

    function getTeamTriCode(team) {
        const exceptions = [
          {name: 'Golden State', triCode: 'GSW'},
          {name: 'Los Angeles', triCode: 'LAC'},
          // {name: 'Los Angeles', triCode: 'LAL'},
          {name: 'New York', triCode: 'NYK'},
          {name: 'New Orleans', triCode: 'NOP'},
          {name: 'Oklahoma City', triCode: 'OKC'},
          {name: 'Brooklyn', triCode: 'BKN'},
          {name: 'San Antonio', triCode: 'SAS'},
          {name: 'Phoenix', triCode: 'PHX'},
          {name: 'Washington', triCode: 'WSH'},
        ]
      
        let triCode = team.substring(0, 3)
      
        let teamException = exceptions.filter(exception => exception.name === team)
        if (teamException.length > 0) {
          triCode = teamException[0].triCode
        }
      
        return {
          name: team,
          triCode: triCode.toUpperCase()
        }
      }
}