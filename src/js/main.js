/* @author: Eric Gonzalez
* Problem 1:
* Description
* Given a list of people with their birth and end years (all between 1900 and 2000),
* find the year with the most number of people alive.
*/

/* Begin: Data Sets */
var firstTest = {"name1":[1900,1954],"name2":[1943,1988],"name3":[1922,1976], "name4":[1933,1954],
"name5":[1940,1941], "name6":[1958,1959], "name7":[1958,1959], "name8":[1958,1959], "name9": [1978,1999],
"name10":[1920,1989], "name11":[1900,1964], "name12":[1933,1998], "name13":[1921,1935], "name14": [1900,1978],
"name15":[1902,1953], "name16":[1907,1986], "name17":[1915,2000], "name18":[1968,2000], "name19": [1937,1984]
};

var secondTest = {};

var thirdTest = {"name1":[1900,1901],"name2":[1905,1999],"name3":[1912,1933], "name4":[1903,1975],
"name5":[1923,1958], "name6":[1912,1967], "name7":[1911,1979], "name8":[1900,2000], "name9": [1933,1958],
"name10":[1978,1989], "name11":[1917,1989], "name12":[1945,1991], "name13":[1917,1920], "name14": [1900,1948],
"name15":[1952,1953], "name16":[1978,1999], "name17":[1978,2000], "name18":[1901,2000], "name19": [1939,1944],
"name20":[1922,1983], "name21":[1912,1984], "name22":[1945,2000], "name23":[1909,1961], "name24": [1919,1986]
};

var fourthTest = {"name1":[1900,1978],"name2":[1905,1946],"name3":[1912,1913], "name4":[1903,1925]};

var fifthTest = {"name1":[1900,1901],"name2":[1905,1999],"name3":[1912,1933], "name4":[1903,1975],
"name5":[1923,1958], "name6":[1912,1967], "name7":[1911,1979], "name8":[1900,2000], "name9": [1933,1958],
"name10":[1978,1989], "name11":[1917,1989], "name12":[1945,1991], "name13":[1917,1920], "name14": [1900,1948],
"name15":[1952,1953], "name16":[1978,1999], "name17":[1978,2000], "name18":[1901,2000], "name19": [1939,1944],
"name20":[1922,1983], "name21":[1912,1984], "name22":[1945,2000], "name23":[1909,1961], "name24": [1919,1986],
"name25":[1916,1984], "name26":[1901,1919], "name27":[1900,1990], "name28":[1905,1947], "name29": [1900,1975],
"name30":[1912,1976], "name31":[1900,1962], "name32":[1908,2000], "name33":[1915,1967], "name34": [1925,1975],
"name35":[1904,1968], "name36":[1917,1988], "name37":[1900,1977], "name38":[1903,1923], "name39": [1905,1998]
};

var sixthTest = {"name1":[1900,1901],"name2":[1902,1902],"name3":[1912,1913], "name4":[1924,1925], "name5":[1924,1924]};

/* End: Data Sets */

var mostYear = [1900];      //Array for the years with the most alive; can be one or many.
var maxAlive = 0;           //How many that were alive during the mostYears.
var data = [];              //Empty array for chart creation.

/* Calculate each year's population by counting how many individuals pass basic if-else (y < [0] && Y >[1].*
 * Other options? Fill an array of years, each index a year holding a population, and search the array for the years with the highest pop. */
function mostAlive(json){
var year = 1900, pop = 0;       //Set Defaults.
mostYear = [1900];
maxAlive = 0;

while(year <= 2000){           //101 iterations (1900-2000)

    for(item in json){         //Traverse the JSON object for each person's birth and end years. [Birth,End]: both inclusive
        if((json[item][0] <= year) && (json[item][1] >= year)){  //Check if each person is alive and increment for the year if true.
            pop++;
        }
    }

    if(pop == maxAlive){        //If more than one year has the highest amount of population, add to array.
        mostYear.push(year);
    }

    else if(pop > maxAlive){    //if larger population is found, set new year and maximum population.
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
//mostAlive(thirdTest);
//mostAlive(fourthTest);
mostAlive(fifthTest);
//mostAlive(sixthTest);

var maxYears = " ";

 for(var i = 0; i < mostYear.length; i++){      //Prepare values for Solution Filling.
    if(i == (mostYear.length - 1)){maxYears = maxYears + mostYear[i];}
       else{maxYears = maxYears + mostYear[i] + ", ";}
 }

/* Fill in Solution information on the screen for user to see. */
d3.select("#solution")
.append('p').text("The year(s) with the most people alive: " + maxYears)
.append('p').text("Most People Alive: " + maxAlive);

/*The following is a modified form of the d3.js chart making tutorial, made into a vertical bar graph.*/
var maxHeight = 300,
    barWidth = 13;

var chart = d3.select('.chart')         //Create Chart Space.
    .attr('width', barWidth * data.length +20)
    .attr('height',maxHeight + 30);

var x = d3.scale.linear().domain([1900,2001]).range([0, barWidth * data.length]);

/* Y Axis not set at this time, I feel like it's easier to tell values with numbers on top */
var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(data.length).tickFormat(d3.format("d"));  //Scaling for the X Axis and setting tick format
//var yAxis = d3.svg.axis().scale(y).orient('left').ticks(maxAlive);

var y = d3.scale.linear()       //Setting up a linear scaling for the bars vertically
    .domain([0, d3.max(data)])
    .range([0, maxHeight-15]);  //Subtract from height to allow numbers on top of bars

var bar = chart.selectAll("g")  //Bar values from data.
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

chart.append("g")           //Create X Axis and call it.
     .attr('class', 'x axis')
     .attr("transform", "translate(0," + (maxHeight) + ")")
     .call(xAxis)
     .selectAll('text')     //Set tick text to sideways for easier reading.
     .attr("x", "-9px")
     .attr("dx","-.95em")
     .attr("transform", "rotate(-90)" );

bar.append("rect")          //Actual bars SVGs
    .attr("width", barWidth - 1)
    .attr("x", barWidth/2 )
    .attr("height", y)
    .attr("y", function(d){ return maxHeight - y(d);})
    .style("fill", function(d){return d == maxAlive ? "gold": "teal";});       //Fill gold for top years.

bar.append("text")          //Numbers above bars
    .style("fill", "black")
    .attr("x", barWidth)
    .attr("y", function(d) { return maxHeight - y(d) - 3; })
    .attr("dx", ".35em")
    .text(function(d) { return d; });