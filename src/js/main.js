/*Problem 1:
* Description
* Given a list of people with their birth and end years (all between 1900 and 2000),
* find the year with the most number of people alive.
*/

var body = d3.select("body");

//Example JSON object for lives
var basic = {"name1":[1900,1954],"name2":[1943,1988],"name3":[1922,1976], "name4":[1933,1954],
"name5":[1940,1941], "name6":[1958,1959], "name7":[1958,1959], "name8":[1958,1959]};
var mostYear = [1900];      //Array for the years with the most alive
var maxAlive = 0;           //How many that were alive during the mostYears

var data = [];

/* Calculate each year's population by counting how many individuals pass basic if-else (y < [0] && Y >[1].*
 * This however does cause O(100n) time complexity. *
 * Time Complexity: O(100n) = O(n) = Theta(n)*
 * Perhaps eliminate having to check already deceased individuals by deleting from array? */
function mostAlive(json){
var year = 1900, pop = 0;
mostYear = [1900];
maxAlive = 0;

while(year <= 2000){         //100 iterations (1900-2000)

    for(item in json){      //Traverse the JSON object for each person's birth and end years. [Birth,End)
        if((json[item][0] <= year) && (json[item][1] > year)){  //Check if each person is alive and increment for the year if true.
            pop++;
        }
    }

    if(pop == maxAlive){ //If more than one year has the highest amount of population, add to array.
        mostYear.push(year);
    }

    if(pop > maxAlive){ //if larger population is found, set year and maximum population.
        mostYear.length = 0;
        mostYear.push(year);
        maxAlive = pop;
    }

    data.push(pop);     //Fill in chart data.
    pop = 0;            //Reset population for next iteration.
    year++;             //Increment year.

    }
}

mostAlive(basic);

console.log(basic);
console.log(data);
console.log(mostYear);
console.log(maxAlive);


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

