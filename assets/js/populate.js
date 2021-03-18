export async function populateHtml (data) {
  document.getElementById('date').innerHTML = data.startsAt.toUTCString()
  document.getElementById('location').innerHTML = data.location

  document.getElementById('host-team-name').innerHTML = data.teams.host.name
  document.getElementById('host-team-tricode').innerHTML = data.teams.host.triCode
  document.getElementById('visitor-team-name').innerHTML = data.teams.visitor.name
  document.getElementById('visitor-team-tricode').innerHTML = data.teams.visitor.triCode

  document.getElementById('host-team-points').innerHTML = data.teams.host.score.final
  document.getElementById('visitor-team-points').innerHTML = data.teams.visitor.score.final

  document.getElementById('host-points-1p').innerHTML = data.teams.host.score.firstP
  document.getElementById('visitor-points-1p').innerHTML = data.teams.visitor.score.firstP
  document.getElementById('host-points-2p').innerHTML = data.teams.host.score.secondP
  document.getElementById('visitor-points-2p').innerHTML = data.teams.visitor.score.secondP
  document.getElementById('host-points-3p').innerHTML = data.teams.host.score.thirdP
  document.getElementById('visitor-points-3p').innerHTML = data.teams.visitor.score.thirdP
  document.getElementById('host-points-4p').innerHTML = data.teams.host.score.fourthP
  document.getElementById('visitor-points-4p').innerHTML = data.teams.visitor.score.fourthP

  document.getElementById('open-file-btn').style.display = 'none'
  document.getElementById('content').style.display = 'block'
}
