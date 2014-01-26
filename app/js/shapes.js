var svg = d3.select('#shapes');

svg.append('rect')
    .attr({
        x: 220,
        y: 50,
        rx: 25,
        ry: 25,
        height: 200,
        width: 200,
        fill: 'green',
        stroke: 'black'
    });

svg.append('circle')
    .attr({
        cx: 160,
        cy: 120,
        r: 100,
        fill:'blue'
    });