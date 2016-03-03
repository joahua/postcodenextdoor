/* jshint node: true */
'use strict';

var fs = require('fs');
var intersect = require('turf-intersect');
var argv = require('minimist')(process.argv.slice(2));

var infile = argv.i || 'postcodes.geojson';
var outfile = argv.o || 'adjacentpostcodes.json';

var postcodes = JSON.parse(fs.readFileSync(infile, 'utf8'));
var ProgressBar = require('progress');

console.log('Postcodes loaded');

var adjacentpostcodes = {};

var shapes = postcodes.features.slice(0,10);
var bar = new ProgressBar('[:bar :percent] Elapsed: :elapseds Remaining: :etas', {
  total: shapes.length
});

shapes.map(function(item) {
  var postcode = getPC(item);
  var adjacent = shapes.filter(function(candidate) {
    // minor optimisation vs iterating all shapes in Oz
    return postcode[0] === getPC(candidate)[0];
  }).filter(function(candidate) {
    return compareIntersection(item, candidate);
  }).map(getPC);

  adjacentpostcodes[postcode] = adjacent;
  bar.tick();
});

fs.writeFile(outfile, JSON.stringify(adjacentpostcodes), function(err) {
  if (err) return console.error('An error occured writing the results file');
  console.log(`Output saved as ${outfile}`);
});

function compareIntersection(source, candidate) {
  return !!intersect(source, candidate) &&
         getPC(source) !== getPC(candidate);
}

function getPC(feature) {
  return feature.properties.POA_CODE;
}