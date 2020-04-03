const fs = require('fs');
const path = require('path');
const csvtojson = require('csvtojson');
const sortBy = require('lodash/sortBy');

const savePath = path.resolve(`../src/data/db.json`);
const bugPath = path.resolve('./data/bug_data.csv');
const fishPath = path.resolve('./data/fish_data.csv');

const formatItem = (item, type) => {
  return {
    id: item.id,
    type,
    name: item.name,
    locationDescription: item.location,
    shadowSize: item.shadowSize,
    timeStart: item.timeStart,
    timeEnd: item.timeEnd,
    priceSell: item.sellPrice,
    monthsNorthernHemisphere: item.monthsNorthernHemisphere.split(','),
    monthsSouthernHemisphere: item.monthsSouthernHemisphere.split(','),
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
    const results = sortBy([...bugsFormatted, ...fishFormatted], 'id');
    saveData(results, savePath);
  } catch (e) {
    console.log(e);
  }
};

init();
