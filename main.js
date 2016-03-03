/* jshint node: true */
'use strict';

var turf = require('turf');
var postcodes = require('./postcodes');

var adjacentpostcodes = {};

var shapes = postcodes.features.slice(0,100);
shapes.map(function(item) {
  var postcode = getPC(item);
  var adjacent = shapes.filter(function(candidate) {
    // this whole thing is very inefficient 
    // minor optimisation vs iterating all shapes in Oz… do this with same 'thousand' prefix?
    // .slice(0,2) is probably less safe from a data perspective
    return postcode[0] === getPC(candidate)[0];
  }).filter(function(candidate) {
    return compareIntersection(item, candidate);
  }).map(getPC);

  adjacentpostcodes[postcode] = adjacent;
  console.log(adjacent);
});

function compareIntersection(source, candidate) {
  return !!turf.intersect(source, candidate) &&
         getPC(source) !== getPC(candidate);
}

function getPC(feature) {
  return feature.properties.POA_CODE;
}