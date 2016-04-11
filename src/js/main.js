/* @author: Eric Gonzalez
* Problem 1:
* Description
* Given a list of people with their birth and end years (all between 1900 and 2000),
* find the year with the most number of people alive.
*/

var mostYear = [1900];      //Array for the years with the most alive
var maxAlive = 0;           //How many that were alive during the mostYears

/* Begin: Data Sets */
var firstTest = {"name1":[1900,1954],"name2":[1943,1988],"name3":[1922,1976], "name4":[1933,1954],
"name5":[1940,1941], "name6":[1958,1959], "name7":[1958,1959], "name8":[1958,1959], "name9": [1978,1999],
"name10":[1920,1989], "name11":[1900,1964], "name12":[1933,1998], "name13":[1921,1935], "name14": [1900,1978],
"name15":[1902,1953], "name16":[1907,1986], "name17":[1915,2000], "name18":[1968,2000], "name19": [1937,1984],
};

var secondTest = {};

var thirdTest = {"name1":[1900,1901],"name2":[1905,1999],"name3":[1912,1933], "name4":[1903,1975],
"name5":[1923,1958], "name6":[1912,1967], "name7":[1911,1979], "name8":[1900,2000], "name9": [1933,1958],
"name10":[1978,1989], "name11":[1917,1989], "name12":[1945,1991], "name13":[1917,1920], "name14": [1900,1948],
"name15":[1952,1953], "name16":[1978,1999], "name17":[1978,2000], "name18":[1901,2000], "name19": [1939,1945],
"name20":[1922,1983], "name21":[1912,1984], "name22":[1945,2000], "name23":[1909,1961], "name24": [1919,1986],
};
/* End: Data Sets */

var data = [];      //Empty array for chart creation

/* Calculate each year's population by counting how many individuals pass basic if-else (y < [0] && Y >[1].*
 * This however does cause O(100n) time complexity. *
 * Time Complexity: O(101n) = O(n) = Theta(n). */
function mostAlive(json){
var year = 1900, pop = 0;
mostYear = [1900];
maxAlive = 0;

while(year <= 2000){           //100 iterations (1900-2000)

    for(item in json){         //Traverse the JSON object for each person's birth and end years. [Birth,End]: both inclusive
        if((json[item][0] <= year) && (json[item][1] >= year)){  //Check if each person is alive and increment for the year if true.
            pop++;
        }
    }

    if(pop == maxAlive){       //If more than one year has the highest amount of population, add to array.
        mostYear.push(year);
    }

    if(pop > maxAlive){        //if larger population is found, set new year and maximum population.
        mostYear.length = 0;
        mostYear.push(year);
        maxAlive = pop;
    }

    data.push(pop);            //Fill in chart data.
    pop = 0;                   //Reset population for next iteration.
    year++;                    //Increment year.

    }
}

/* Begin Program Execution*/
//mostAlive(firstTest);
//mostAlive(secondTest);
mostAlive(thirdTest);


var maxYears = " ";

 for(var i = 0; i < mostYear.length; i++){
    if(i == (mostYear.length - 1)){maxYears = maxYears + mostYear[i];}
       else{maxYears = maxYears + mostYear[i] + ", ";}
 }

console.log(data.length);

/* Fill in Solution information on the screen for user to see. */
d3.select("#solution")
.append('p').text("The year(s) with the most people alive: " + maxYears)
.append('p').text("Most People Alive: " + maxAlive);

/*The following is a modified form of the d3.js chart making tutorial, made into a vertical bar graph.*/
var maxHeight = 300,
    barWidth = 14;

var chart = d3.select('.chart')
    .attr('width', barWidth * data.length +40)
    .attr('height',maxHeight + 30);

var x = d3.scale.linear().domain([1900,2001]).range([0, barWidth * 101]);

var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(101).tickFormat(d3.format("d"));
//var yAxis = d3.svg.axis().scale(y).orient('left').ticks(maxAlive);

var y = d3.scale.linear()       //Setting up a linear scaling for the bars
    .domain([0, d3.max(data)])
    .range([0, maxHeight-15]);

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

chart.append("g")
      .attr('class', 'x axis')
      .attr("transform", "translate(0," + (maxHeight) + ")")
      .call(xAxis)
      .selectAll('text')
      .attr("x", "-9px")
      .attr("dx","-.95em")
      .attr("transform", "rotate(-90)" );

bar.append("rect")
    .attr("width", barWidth - 1)
//    .attr("dx", ".5em")
    .attr("height", y)
    .attr("y", function(d){ return maxHeight - y(d);})
    .style("fill", function(d){return d == maxAlive ? "gold": "steelblue";});       //Fill gold in for top years.

bar.append("text")
    .style("fill", "black")
    .attr("x", barWidth / 2)
    .attr("y", function(d) { return maxHeight - y(d) - 3; })
    .attr("dx", ".35em")
    .text(function(d) { return d; });