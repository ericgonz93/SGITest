var body = d3.select("body");

//Example JSON object for lives
var basic = {"name1":[1900,1954],"name2":[1943,1988],"name3":[1922,1976]};

var data = [];

function parseData(json){   //Parsing JSON object filled with start and end years


for(item in json){      //Traverse the JSON object for each year
data.push(json[item][0]);
data.push(json[item][1]);
}

/* Calculate each year's population by counting how many individuals pass basic if-else (y < [0] && Y >[1].*
 * This however does cause O(100n) time complexity. *
 * Perhaps eliminate having to check already deceased individuals by deleting from array???? */



}

parseData(basic);

console.log(basic);
console.log(data);

//var data = [15,22,13,55];

var maxWidth = 420,
    barHeight = 20;

var chart = d3.select('.chart')
    .attr('width', maxWidth)
    .attr('height', barHeight * data.length);

var x = d3.scale.linear()       //Setting up a linear scaling for the bars
    .domain([0,d3.max(data)])
    .range([0,maxWidth]);

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });

