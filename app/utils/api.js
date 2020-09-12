const id = 'YOUR_CLIENT_ID'
const secret = 'YOUR_SECRET_ID'
const params = `?client_id=${id}&client_secret${secret}`

function getErrMsg(message, username){
  if(message === 'Not Found') {
    return `${username} doesn't exist`
  }
  return message;
}

function getProfile(username){
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then(res => res.json())
    .then(profile => {
      if(profile.message){
        throw new Error(getErrMsg(profile.message, username))
      }
      return profile
    })
}

function getRepos(username){
  return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then(res => res.json())
    .then(repos => {
      if(repos.message){
        throw new Error(getErrMsg(repos.message, username))
      }
      return repos
    })
}

function getStarCount(repos){
  return repos.reduce((count, {stargazers_count}) => count + stargazers_count, 0)
}

function calculateScore(followers, repos){
  return (followers * 3) + getStarCount(repos)
}

function getUserData(player){
  return Promise.all([
    getProfile(player),
    getRepos(player)
    ]).then(([ profile, repos ]) => {
          return {
            profile,
            score: calculateScore(profile.followers, repos)
          }
      }
    )
}

export function battle (players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1])
  ]).then((results) => sortPlayers(results))
}

function sortPlayers(players){
  return players.sort((a, b) => b.score - a.score)
}

export function fetchPopularRepos (language){
  const endPoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
  return fetch(endPoint)
    .then(res => res.json())
    .then(data => {
      if(!data.items){
        throw new Error(data.message)
      }
      return data.items
    })
}
