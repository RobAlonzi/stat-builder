
const GAME_URL = id => `https://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`;
const PLAYER_URL = id => `https://statsapi.web.nhl.com/api/v1/people/${id}`;
const OFFICIAL_URL = id => `https://records.nhl.com/site/api/officials?cayenneExp=id=${id}`;
const TEAM_URL = id => `https://statsapi.web.nhl.com/api/v1/teams/${id}`;

module.exports = {
    GAME_URL,
    PLAYER_URL,
    OFFICIAL_URL,
    TEAM_URL,
}