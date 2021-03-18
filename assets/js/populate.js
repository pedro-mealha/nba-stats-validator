export async function populateHtml (data) {
  document.getElementById('date').innerHTML = data.startsAt.toUTCString()
  document.getElementById('location').innerHTML = data.location

  document.getElementById('host-team-name').innerHTML = data.teams.host.name
  document.getElementById('host-team-tricode').innerHTML = data.teams.host.triCode
  document.getElementById('visitor-team-name').innerHTML = data.teams.visitor.name
  document.getElementById('visitor-team-tricode').innerHTML = data.teams.visitor.triCode

  document.getElementById('host-team-points').innerHTML = data.teams.host.score.final
  document.getElementById('visitor-team-points').innerHTML = data.teams.visitor.score.final

  document.getElementById('open-file-btn').style.display = 'none'
  document.getElementById('content').style.display = 'block'
}
