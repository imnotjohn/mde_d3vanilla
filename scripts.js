// colors
const countiesBorderColor = '#ff0000';
const countiesFillColor = '#ff0000';

// window constants
const width = window.innerWidth;
const height = window.innerHeight;
const mapSize = [width, height];

const promises = [
    d3.json('./data/us_counties.json'), // US counties geojson
    d3.json('./data/tribal-geojson.json'), // tribal lands geojson
];

Promise.all(promises).then((data) => {
    const countiesGeoJson = data[0];
    // const tribalsGeoJson = data[1];

    const projection = d3.geoEquirectangular().fitSize(mapSize, countiesGeoJson).scale(.05);
    const geoPathGenerator = d3.geoPath().projection(projection);

    // create svg elements for each data feature
    const svg = d3.selectAll('svg')
        .data(countiesGeoJson.features)
        .enter()
        .append('svg')
        .style('fill', countiesFillColor)
        .style('stroke', countiesFillColor)
        
    // append path element for each svg 
    svg.append('path')
        .attr('d', d => geoPathGenerator(d))

    // test playground
    // const elements = d3.selectAll('p')
    //     .data(countiesGeoJson)
    //     .enter()
    //     .append('p')
    //     .text('hello')
    // return elements;

    // console.log(svg.node());
    return svg.node();
})