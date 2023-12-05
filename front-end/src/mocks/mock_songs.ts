// etails for the song "slide tackle"
const slide_tackle_map = new Map<string, string | string[] | number>([
  ["name", "slide tackle"],
  ["duration", 12345],
  ["artists", ["japanese breakfast"]],
  ["album", "jubilee"],
  ["popularity", 100],
]);

// details for the song "limbo"
const limbo_map = new Map<string, string | string[] | number>([
  ["name", "limbo"],
  ["duration", 54321],
  ["artists", ["keshi"]],
  ["album", "gabriel"],
  ["popularity", 100],
]);

export const small_song_dataset = new Map<
  string,
  Map<string, string | string[] | number>
>([
  ["alternative", slide_tackle_map],
  ["pop", limbo_map],
]);
