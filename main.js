const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 200;
const MARGINS = {left: 60, right: 60, top: 20, bottom: 20};

const data = [55000, 48000, 27000, 66000, 90000];

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const MAX_Y = d3.max(data, (d) => {return d;});

const Y_SCALE = d3.scaleLinear()
                    .domain([0, (MAX_Y + 10000)])
                    .range([0, VIS_HEIGHT]);

const FRAME = 
d3.select('#plot')
    .append("svg")
        .attr("height", FRAME_HEIGHT)
        .attr("width", FRAME_WIDTH)
        .attr("class", "frame");

FRAME.append("g")
        .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
        .call(d3.axisLeft(Y_SCALE).ticks(5))
        .attr("font-size", '14px');

FRAME.selectAll("points")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", MARGINS.left)
            .attr("cy", (d) => {
                return (Y_SCALE(d) + MARGINS.top)
            })
            .attr("r", 6)
            .attr("class", "point");
