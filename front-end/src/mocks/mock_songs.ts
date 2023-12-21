// details for the song "slide tackle"
const slide_tackle_map = new Map<string, string | string[] | number>([
  ["name", "slide tackle"],
  ["duration", 123456],
  ["artists", ["japanese breakfast"]],
  ["album", "jubilee"],
  ["popularity", 100],
  ["genre", "alternative"]
]);

// details for the song "limbo"
const limbo_map = new Map<string, string | string[] | number>([
  ["name", "limbo"],
  ["duration", 543210],
  ["artists", ["keshi"]],
  ["album", "gabriel"],
  ["popularity", 100],
  ["genre", "pop"]
]);

// details for the song "imagining"
const imagining_map = new Map<string, string | string[] | number>([
  ["name", "imagining"],
  ["duration", 888888],
  ["artists", ["rina sawayama"]],
  ["album", "hold the girl"],
  ["popularity", 200],
  ["genre", "alternative"]
]);

const la_la_lost_you_map = new Map<string, string | string[] | number>([
  ["name", "la la lost you"],
  ["duration", 888888],
  ["artists", ["niki", "88rising"]],
  ["album", "head in the clouds ii"],
  ["popularity", 200],
  ["genre", "pop"]
]);

const long_flight_map = new Map<string, string | string[] | number>([
  ["name", "long flight"],
  ["duration", 999999],
  ["artists", ["taeyong"]],
  ["album", "long flight"],
  ["popularity", 300],
  ["genre", "kpop"]
]);

export const all_genres = new Array<string>(
  "alternative", "pop", "kpop"
)

export const small_song_dataset = new
  Array<Map<string, string | string[] | number>>
(slide_tackle_map, imagining_map, limbo_map, la_la_lost_you_map, long_flight_map);

export const pop_most_to_least = new Array<
  Map<string, string | string[] | number>
>(
  long_flight_map,
  la_la_lost_you_map,
  imagining_map,
  slide_tackle_map,
  limbo_map
);

export const pop_least_to_most = new Array<
  Map<string, string | string[] | number>
>(
  limbo_map,
  slide_tackle_map,
  imagining_map,
  la_la_lost_you_map,
  long_flight_map
);

export const dur_most_to_least = new Array<
  Map<string, string | string[] | number>
>(
  long_flight_map,
  la_la_lost_you_map,
  imagining_map,
  limbo_map,
  slide_tackle_map
);

export const dur_least_to_most = new Array<
  Map<string, string | string[] | number>
>(
  slide_tackle_map,
  limbo_map,
  imagining_map,
  la_la_lost_you_map,
  long_flight_map
);

export const pop_dur_most_to_least = new Array<
  Map<string, string | string[] | number>
>(
  long_flight_map,
  la_la_lost_you_map,
  imagining_map,
  limbo_map,
  slide_tackle_map
);

export const pop_dur_least_to_most = new Array<
  Map<string, string | string[] | number>
>(
  slide_tackle_map,
  limbo_map,
  imagining_map,
  la_la_lost_you_map,
  long_flight_map
);
