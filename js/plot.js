// Zoom http://bl.ocks.org/sgruhier/1d692762f8328a2c9957
var margin = {top: 20, right: 20, bottom: 20, left: 80};
var width = 1200 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;
var color = d3.scale.category20();

// SVG (group) to draw in.
var svg = d3.select("#chart").append("svg")
        .attr({
          width: width + margin.left + margin.right,
          height: height + margin.top + margin.bottom
        })
        .call(d3.behavior.zoom().on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
      }))
        .append("g")
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var linksGroup = svg.append("g").attr('class', 'links');
var nodesGroup = svg.append("g").attr('class', 'nodes');

// Set up Sankey object.
var sankey = d3.sankey()
        .nodeWidth(30)
        .nodePadding(5)
        .size([width, height]);

// Get path data generator
var path = sankey.link();

// load the data (using the timelyportfolio csv method)
d3.csv("data/migr.csv", function(error, data) {

  //set up graph in same style as original example but empty
  graph = {"nodes" : [], "links" : [], 'sinksRight': false};

    data.forEach(function (d) {
      graph.nodes.push({ "name": d.source });
      graph.nodes.push({ "name": d.target });
      graph.links.push({ "source": d.source,
                         "target": d.target,
                         "value": +d.value });
     });

     // return only the distinct / unique nodes
     graph.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .map(graph.nodes));

     // loop through each link replacing the text with its index from node
     graph.links.forEach(function (d, i) {
       graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
       graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
     });

     //now loop through each nodes to make nodes an array of objects
     // rather than an array of strings
     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });

 
    sankey.nodes(graph.nodes)
          .links(graph.links)
          .sinksRight('sinksRight' in data ? data.sinksRight : true)
          .layout(32);

    // Draw the links.
    var links = linksGroup.selectAll('.link').data(graph.links);
    // Enter
    links.enter()
            .append("path")
            .attr('class', 'link');
    // Enter + Update
    links.attr('d', path)
            .style("stroke-width", function (d) {
              return Math.max(1, d.dy);
            });
    links.classed('backwards', function (d) { return d.target.x < d.source.x; });

    links.append("title")
            .text(function (d) {
              return d.source.name + " -> " + d.target.name + " = " + d.value;
            });
    // Exit
    links.exit().remove();

    // Draw the nodes.
    var nodes = nodesGroup.selectAll('.node').data(graph.nodes);
    // Enter
    var nodesEnterSelection = nodes.enter()
            .append("g")
            .attr('class', 'node');
    nodesEnterSelection.append("rect")
            .attr('width', sankey.nodeWidth())
            .append("title");
    nodesEnterSelection.append("text")
            .attr('x', 35)

            .attr('dy', ".35em")

    // Enter + Update
    nodes
            .attr('transform', function (d) {
              return "translate(" + d.x + "," + d.y + ")";
            });
    nodes.select('rect')
            .attr('height', function (d) {
              return d.dy;
            })
            .style('fill', function (d) {
              return d.color = color(d.name.replace(/ .*/, ""));
            })
            .style('stroke', function (d) {
              return d3.rgb(d.color).darker(2);
            });
    nodes.select('rect').select('title')
            .text(function (d) {
              return d.name;
            });
    nodes.select('text')
            .attr('y', function (d) {
              return d.dy / 2;
            })
            .text(function (d) {
              return d.name;
            });
    // Exit
    nodes.exit().remove();
});
