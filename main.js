/* jshint node: true */
'use strict';

var fs = require('fs');

var intersect = require('turf-intersect');
var postcodes = JSON.parse(fs.readFileSync('postcodes.geojson', 'utf8', function(err) {
  if (err) return console.error('Postcodes failed to load. Please check postcodes.geojson is in the application root.');
}));

console.log('Postcodes loaded');

var adjacentpostcodes = {};

var shapes = postcodes.features.slice(0,100);
shapes.map(function(item) {
  var postcode = getPC(item);
  var adjacent = shapes.filter(function(candidate) {
    // minor optimisation vs iterating all shapes in Oz
    return postcode[0] === getPC(candidate)[0];
  }).filter(function(candidate) {
    return compareIntersection(item, candidate);
  }).map(getPC);

  adjacentpostcodes[postcode] = adjacent;
});

fs.writeFile('adjacentpostcodes.json', JSON.stringify(adjacentpostcodes), function(err) {
  if (err) return console.error('An error occured writing the results file');
  console.log('Output saved as adjacentpostcodes.json');
})

function compareIntersection(source, candidate) {
  return !!intersect(source, candidate) &&
         getPC(source) !== getPC(candidate);
}

function getPC(feature) {
  return feature.properties.POA_CODE;
}