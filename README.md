# Postcode next door

This tool outputs a list of adjacent postcodes using the [turf.js library](http://turfjs.org).

It was built for Australian postcodes but should work anywhere.

## Use instructions
1. Download a postcode shapefile from http://www.abs.gov.au/AUSSTATS/subscriber.nsf/log?openagent&1270055003_poa_2011_aust_shape.zip&1270.0.55.003&Data%20Cubes&71B4572D909B934ECA2578D40012FE0D&0&July%202011&22.07.2011&Previous – or http://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.003July%202011?OpenDocument if you can't reach the first link.
2. Extract and convert the ESRI shapefile to GeoJSON using http://www.mapshaper.org/. Save the file as `postcodes.geojson`
3. Run `node main.js` and go make yourself a cup of tea.
4. Find the output at `adjacentpostcodes.json`

## Aspirations
Ideally this tool would do all the stuff above for you.

Wishlist if you'd like to PR:
1. Mapshaper integration
2. argv options for input/output