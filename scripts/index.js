const fs = require('fs');
const path = require('path');
const csvtojson = require('csvtojson');
const sortBy = require('lodash/sortBy');

const savePath = path.resolve(`./output/dump-${new Date().getTime()}.json`);
const bugPath = path.resolve('./data/bug_data.csv');
const fishPath = path.resolve('./data/fish_data.csv');

const nameToKey = (name = '') => {
  return name
    .replace(/[,']+/g, '')
    .split(' ')
    .join('-')
    .toLowerCase();
};

const locationToString = (location = '') => {
  if (['On A Tree Stump', 'On Tree Stump'].includes(location)) return 'On Tree Stump';
  if (['On Tree', 'On Trees'].includes(location)) return 'On Trees';
  if (['On the Ground', 'On Ground', 'Hopping'].includes(location)) return 'On The Ground';
  if (['In Trees', 'Shake a Tree', 'Shake Tree', 'Shaking Tree'].includes(location)) return 'Shake a Tree';
  if (location === 'Beach') return 'On The Beach';
  if (location === 'Beach Rocks') return 'On Beach Rocks';
  if (location === 'Hit A Rock') return 'Hit a Rock';
  if (location === 'River (Clifftop)/River') return 'River, River (Clifftop)';
  if (location === 'River (Clifftop) / River / Pond') return 'Pond, River, River (Clifftop)';
  return location;
};

const locationToArr = (location = '') => {
  if (location === 'Flying') return ['FLYING'];
  if (location === 'Above Purple, Black, Blue Flowers')
    return ['FLYING', 'FLOWERS_BLACK', 'FLOWERS_BLUE', 'FLOWERS_PURPLE'];
  if (location === 'Around Light') return ['FLYING', 'LIGHT'];
  if (location === 'On Tree') return ['TREES'];
  if (location === 'On Trees') return ['TREES'];
  if (location === 'On A Tree Stump') return ['STUMP'];
  if (location === 'On the Ground') return ['GROUND'];
  if (location === 'On Ground') return ['GROUND'];
  if (location === 'Hopping') return ['GROUND'];
  if (location === 'On Flowers') return ['FLOWERS'];
  if (location === 'On Flowers (White)') return ['FLOWERS_WHITE'];
  if (location === 'In Trees') return ['TREES_SHAKE'];
  if (location === 'Shake a Tree') return ['TREES_SHAKE'];
  if (location === 'Shake Tree') return ['TREES_SHAKE'];
  if (location === 'Shaking Tree') return ['TREES_SHAKE'];
  if (location === 'Underground') return ['UNDERGROUND'];
  if (location === 'On Ponds') return ['POND_SURFACE'];
  if (location === 'On Ponds and Rivers') return ['POND_SURFACE', 'RIVER_SURFACE'];
  if (location === 'Under Tree Disguised as Leaf') return ['TREES_BELOW'];
  if (location === 'On rotten food') return ['FOOD_ROTTEN'];
  if (location === 'Beach') return ['BEACH'];
  if (location === 'Beach Rocks') return ['ROCKS_BEACH'];
  if (location === 'On Rocks When Raining') return ['ROCKS', 'RAIN'];
  if (location === 'Hit A Rock') return ['ROCKS_HIT'];
  if (location === 'On Trash') return ['TRASH'];
  if (location === 'On Villagers Heads') return ['VILLAGER_HEAD'];
  if (location === 'River') return ['RIVER'];
  if (location === 'River (Clifftop)') return ['RIVER_CLIFF'];
  if (location === 'River (Clifftop)/River') return ['RIVER', 'RIVER_CLIFF'];
  if (location === 'River (Clifftop) / River / Pond') return ['POND', 'RIVER', 'RIVER_CLIFF'];
  if (location === 'River (Mouth)') return ['RIVER_MOUTH'];
  if (location === 'Sea') return ['SEA'];
  if (location === 'Sea (Rain)') return ['SEA', 'RAIN'];
  if (location === 'Pond') return ['POND'];
  if (location === 'Pier') return ['PIER'];
  return [`UNKNOWN - ${location}`];
};

const formatItem = (item, type) => {
  return {
    type,
    identifier: nameToKey(item['Name']),
    name: item['Name'],
    locationDescription: locationToString(item['Location']),
    locationKeys: locationToArr(item['Location']),
    timeStart: item['Time Start'],
    timeEnd: item['Time End'],
    priceSell: item['Sell Price'],
    monthsNorthernHemisphere: item['NH Months'].split(','),
    monthsSouthernHemisphere: item['SH Months'].split(','),
  };
};

const saveData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const init = async () => {
  try {
    const bugs = await csvtojson().fromFile(bugPath);
    const bugsFormatted = bugs.map(i => formatItem(i, 'BUG'));
    const fish = await csvtojson().fromFile(fishPath);
    const fishFormatted = fish.map(i => formatItem(i, 'FISH'));
    const results = sortBy([...bugsFormatted, ...fishFormatted], 'identifier');
    saveData(results, savePath);
  } catch (e) {
    console.log(e);
  }
};

init();
