// colors
const countiesBorderColor = '#ff0000';
const countiesFillColor = '#ff0000';

// window constants
const width = window.innerWidth;
const height = window.innerHeight;
const mapSize = [width, height];

const promises = [
    // d3.json('./data/us_counties.json'), // US counties geojson
    d3.json('https://d3js.org/us-10m.v1.json'), // US Counties geojson
    d3.json('./data/tribal-geojson.json'), // tribal lands geojson
];

Promise.all(promises).then((data) => {
    const usGeoJson = data[0];
    const path = d3.geoPath();

    const svg = d3.select('#chart')
        .attr('width', width)
        .attr('height', height);

    svg.append('g')
        .attr('class', 'counties')
    .selectAll('path')
    .data(topojson.feature(usGeoJson, usGeoJson.objects.counties).features)
    .enter()
    .append('path')
        .attr('d', path)
        .attr('stroke', 'white');

    svg.append('path')
        .attr('class', 'county-borders')
        .attr('d', path(topojson.mesh(usGeoJson, usGeoJson.objects.counties, (a, b) => a !== b)))
        .attr('stroke', 'white');
});