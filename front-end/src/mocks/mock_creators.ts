// details for victo ngai
const victo_ngai_map = new Map<string, string>([
  ["name", "victo ngai"],
  ["type", "Visual Arts"],
  ["description", "illustrator who makes colorful, detailed, whimsical work"],
  ["id", "123"],
]);

// details for wong fu productions
const wongfu_map = new Map<string, string>([
  ["name", "wong fu productions"],
  ["type", "Visual Arts"],
  ["description", "short films and skits on youtube!"],
  ["website", "url here"],
  ["id", "333"],
]);

// details for phil kaye
const phil_kaye_map = new Map<string, string>([
  ["name", "phil kaye"],
  ["type", "Literary Arts"],
  [
    "description",
    "spoken word poet whose works include 'surplus' and 'camaro'",
  ],
  ["website", "https://philkaye.com/"],
  ["instagram", "https://www.instagram.com/peekaye/?hl=en"],
  ["id", "222"],
]);

// details for keone and mari
const keone_and_mari_map = new Map<string, string>([
  ["name", "keone and mari"],
  ["type", "Performing Arts"],
  ["description", "choreographer and director duo >>>"],
  ["website", "url here"],
  ["id", "000"],
]);

// details for trevor takemoto
const trevor_takemoto_map = new Map<string, string>([
  ["name", "trevor takemoto"],
  ["type", "Performing Arts"],
  ["description", "dancer and choreographer based in california"],
  ["website", "url here"],
  ["instagram", "@trevortakemoto"],
  ["id", "678"],
]);

// details for kazuo ishiguro
const kazuo_ishiguro_map = new Map<string, string>([
  ["name", "kazuo ishiguro"],
  ["type", "Literary Arts"],
  [
    "description",
    "author whose well known works include 'never let me go' and 'remains of the day'",
  ],
  ["id", "789"],
]);

// details for cliff tan
const cliff_tan_map = new Map<string, string>([
  ["name", "cliff tan"],
  ["type", "Visual Arts"],
  ["description", "architect and interior designer"],
  ["id", "234"],
]);

const creator_all_socials_map = new Map<string, string>([
  ["name", "popular creator"],
  ["type", "Other"],
  ["description", "this is a test"],
  ["website", "url here"],
  ["instagram", "@instagram"],
  ["facebook", "@facebook"],
  ["spotify", "@spotify"],
  ["price", "100"],
  ["id", "111"],
]);

export const small_creators_dataset = new Array<Map<string, string>>(
  victo_ngai_map,
  wongfu_map,
  phil_kaye_map,
  keone_and_mari_map,
  trevor_takemoto_map,
  kazuo_ishiguro_map,
  cliff_tan_map,
  creator_all_socials_map
);

// display id so that it can be deleted, perhaps put in corner of each artist

// name
// type
// price
// description
// instagram
// facebook
// website
// spotify
