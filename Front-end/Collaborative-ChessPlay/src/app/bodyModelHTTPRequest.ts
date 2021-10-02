

export interface userConnection{
  "name" : string,
  "id_game": string,
  "team": number
}

export interface userPlayMove{
  "player": string,
  "game_id": string,
  "x1Coord": number,
  "y1Coord": number,
  "x2Coord": number,
  "y2Coord": number
}
