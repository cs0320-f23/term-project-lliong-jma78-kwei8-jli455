// details for the song "slide tackle"
const slide_tackle_map = new Map<string, string | string[] | number>([
  ["name", "slide tackle"],
  ["duration", 123456],
  ["artists", ["japanese breakfast"]],
  ["album", "jubilee"],
  ["popularity", 100],
]);

// details for the song "limbo"
const limbo_map = new Map<string, string | string[] | number>([
  ["name", "limbo"],
  ["duration", 543210],
  ["artists", ["keshi"]],
  ["album", "gabriel"],
  ["popularity", 100],
]);

// details for the song "imagining"
const imagining_map = new Map<string, string | string[] | number>([
  ["name", "imagining"],
  ["duration", 888888],
  ["artists", ["rina sawayama"]],
  ["album", "hold the girl"],
  ["popularity", 200],
]);

const la_la_lost_you_map = new Map<string, string | string[] | number>([
  ["name", "la la lost you"],
  ["duration", 888888],
  ["artists", ["niki", "88rising"]],
  ["album", "head in the clouds ii"],
  ["popularity", 200],
]);

const long_flight_map = new Map<string, string | string[] | number>([
  ["name", "long flight"],
  ["duration", 999999],
  ["artists", ["taeyong"]],
  ["album", "long flight"],
  ["popularity", 300],
]);

export const small_song_dataset = new Map<string, Array<Map<string, string | string[] | number>>>([
  ["alternative", [slide_tackle_map, imagining_map]],
  ["pop", [limbo_map, la_la_lost_you_map]], ["kpop", [long_flight_map]]
]);
