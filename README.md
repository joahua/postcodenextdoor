# Postcode next door

This tool outputs a list of adjacent postcodes using the [turf.js library](http://turfjs.org).

It was built for Australian postcodes but should work anywhere.

## Usage
`postcodenextdoor`

`postcodenextdoor -i [input geojson] -o [output json]`

## Input
Well-formed geojson is expected, but actually we just jump to `features` inside the geojson object and iterate from there.

## Output
```
{"2000":["2007","2008","2009","2010","2011"],"2006":["2007","2008"],"2007":["2000","2006","2008","2009"]}
```

## Use instructions
1. Download a [postcode shapefile from the ABS](http://www.abs.gov.au/AUSSTATS/subscriber.nsf/log?openagent&1270055003_poa_2011_aust_shape.zip&1270.0.55.003&Data%20Cubes&71B4572D909B934ECA2578D40012FE0D&0&July%202011&22.07.2011&Previous) – listed [on this index](http://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.003July%202011?OpenDocument) if you can't reach the first link.
2. Extract and convert the ESRI shapefile to GeoJSON using http://www.mapshaper.org/. Save the file as `postcodes.geojson`
3. Run `node main.js` and go make yourself a cup of tea.
4. Find the output at `adjacentpostcodes.json`

## Aspirations
Ideally this tool would do all the stuff above for you. The GeoJSON is too big to be Git(hub) friendly so would need to be pulled down as ESRI and converted in all likelihood.

Wishlist if you'd like to PR:

1. Mapshaper integration