var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 900 - margin.left - margin.right, //1500 //15000 for year 2000 and 1984 use 2400and for small set use 2000
    height = 900 - margin.top - margin.bottom; //1000

var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", 900 + margin.left + margin.right) //width //2000 //17000 // for year 2000 and 1984 use 3000, 1000 for small set use 2000
    .attr("height", 900 + margin.top + margin.bottom) //height //1000
    .append("g")
    .attr('id','parent_group')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.attr('transform', 'rotate(180,500,500)')
    .attr('transform', 'translate(300,300)');

var center_semi_circles_group = svg.selectAll('.center_semi_circle')
                                   .data(book_data);

var mygroup = center_semi_circles_group.enter()
                         .append('g')
                         .attr('class', 'center_semi_circle');

var arc = d3.arc();
var read_percentage = (book_data[0].pages_read/book_data[0].pages)*100;


//scales
const colour_scale = d3.scaleOrdinal(d3.schemeSet3);
colour_scale.domain(genre_list);

const rate_scale = d3.scaleLinear().domain([0,5]).range([3,8]);
const page_scale = d3.scaleLinear().domain([0,25]).range([0,125]); //0,50, 0,125
//scales


var pageoriginX = ((40) * Math.sin(0));
var pageoriginY = ((40) * Math.cos(0));

var pageWidth = 0.75;

//genre circles
for(var i = 0; i < book_data[0].genre.length+2; i++){

    if(i == 0){
        radius = 0;
        fill = 'none';
    }
    else if(i == (book_data[0].genre.length +1)){
        radius = 0;
        fill = 'none';
    }
    else{
        radius = 50;
        fill = colour_scale(book_data[0].genre[i-1]); 
    }

    mygroup.append('circle')
        .attr('class', 'genre_circle')
        .attr('fill', fill)
        .attr('r', radius)
        .attr('cx', pageoriginX - (pageWidth / 2))
        .attr('cy', pageoriginY - (pageWidth / 2))
        .attr('transform', `rotate(${90+(i*(180/(book_data[0].genre.length+1)))},0,-30)`)
}
//genre circles

//blur defs
var defs = svg.append("defs");
var filter = defs.append("filter")
    .attr("id","glow");

filter.append("feGaussianBlur")
    .attr("stdDeviation","8"); 

mygroup.selectAll('.genre_circle')
    .style("filter", "url(#glow)")
    .attr('opacity', 0.5);
//blur defs 

//progress circle
mygroup.append('path')
        .attr('d', arc({
                innerRadius: 0,
                outerRadius: 30,
                startAngle: 0,
                endAngle: read_percentage/100*Math.PI
            }))
        .attr('fill', '#5DADE2')
        .attr('transform', 'rotate(-90,0,0)')
        .attr('class', 'progress_circle');
//progress circle

//full circle
mygroup.append('path')
        .attr('d', arc({
                innerRadius: 0,
                outerRadius: 30,
                startAngle: 0,
            endAngle: Math.PI
        }))
        .attr('fill', 'none')
        .attr('stroke', '#808B96')
        .attr('transform', 'rotate(-90,0,0)')
        .attr('class', 'full_circle');
//full circle

/* mygroup.append('circle')
        .attr('class', 'genre_circle')
        .attr('fill', 'yellow')
        .attr('r', 50)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('transform', 'translate(0,-100)');


mygroup.append('circle')
        .attr('class', 'genre_circle')
        .attr('fill', 'pink')
        .attr('r', 50)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('transform', 'translate(-60,-50)');

mygroup.append('circle')
        .attr('class', 'genre_circle')
        .attr('fill', '#85C1E9')
        .attr('r', 50)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('transform', 'translate(60,-50)');

var defs = svg.append("defs");
var filter = defs.append("filter")
    .attr("id","glow");

filter.append("feGaussianBlur")
    .attr("stdDeviation","10");

mygroup.selectAll('.genre_circle')
        .style("filter", "url(#glow)")
        .attr('opacity', 0.5); */


 
const div_factor = 25;
var no_of_page_lines_abs = Math.floor(book_data[0].pages/div_factor);
//console.log(no_of_page_lines_abs)

var no_of_page_lines_rem = book_data[0].pages%div_factor;
//console.log(no_of_page_lines_rem)

var no_of_page_lines = (no_of_page_lines_rem) ?  no_of_page_lines_abs + 1: no_of_page_lines_abs + 0
//console.log(page_scale(1))



for(var i = 0; i< (no_of_page_lines + 2); i++){
    

    if(i == 0){
        height = 145;
        width = rate_scale(book_data[0].my_rating); //2.5
        colour = '#273746'
        stroke = 'none'
        rotate = 90 + i* (180 / (no_of_page_lines+1 ))
        x = 0;
        y = 0;
        text = book_data[0].my_rating
    }
    else if(i == (no_of_page_lines +1)){
        height = 145;
        width = rate_scale(book_data[0].rating); //2.5
        colour = '#273746';
        stroke = 'none';
        rotate = 90 + i* (180 / (no_of_page_lines+1 )); //2.5
        x = 0 //2.5;
        y = 0 + rate_scale(book_data[0].rating)
        text = book_data[0].rating
    }
    else if(i == no_of_page_lines){
        height = page_scale(no_of_page_lines_rem);
        console.log(page_scale(no_of_page_lines_rem));
        console.log(no_of_page_lines_rem);
        width = pageWidth;
        colour = 'none'
        stroke = '#808B96'
        rotate = 90 + i* (180 / (no_of_page_lines+1 ))
        x = 0;
        y = 0;
        text = no_of_page_lines_rem

        /* var chair_dummy = svg.append('rect')
               .attr('x', 300)
               .attr('y', 300)
               .attr('width', width)
               .attr('opacity', 1)
               .attr('height', height)
               .attr('fill', colour)
               .attr('stroke', stroke) */

    }
    else{
        height = page_scale(div_factor);
        width = pageWidth;
        colour = 'none'
        stroke = '#808B96'
        rotate = 90 + i* (180 / (no_of_page_lines+1 ))
        x = 0;
        y = 0;
        text = div_factor
    }

    var chair = svg.append('rect')
               .attr('x', pageoriginX - (pageWidth / 2))
               .attr('y', pageoriginY - (pageWidth / 2))
               .attr('width', width)
               .attr('opacity', 1)
               .attr('height', height)
               .attr('fill', colour)
               .attr('stroke', stroke)
               .attr('transform', `rotate(${rotate},0,0)`)

    
               //.attr('transform', `rotate(${rotate},0,0)`)
    
    /* var support_text = svg.append('text')
                          .text(text)
                          .attr('class', 'support_text')
                          .attr('x', pageoriginX - (pageWidth / 2))
                          .attr('y', pageoriginY - (pageWidth / 2) + height + 20)
                          .style("font-size", "15px")
                          .attr('text-anchor', 'middle')
                          .attr('fill', '#808B96')
                          .attr("font-family", "Roboto")
                          .attr('transform', `rotate(${rotate},0,0)`) */


}


var bookmark_images = svg.append('g')
                         .attr('class', 'bookmark_images')

bookmark_images.append('image')
.attr("xlink:href", function(){
    if(book_data[0].type == 'novel'){
        return "novels.png"
    }
    else if(book_data[0].type == 'graphic novel'){
        return "graphic_novels.png"
    }
    else{
        return "manga.png"
    }})
.attr("width", "30") //25
.attr("height", "30") //25
.attr('transform', 'translate(120,0)')

var status_circle = svg.append('g').attr('class', 'status circle')

status_circle.append('circle')
            .attr('r', 7)
            .attr('fill', function(){
                if(book_data[0].currently_reading == 'reading'){
                    return '#2ECC71'
                }
                else if(book_data[0].currently_reading == 'left'){
                    return '#E74C3C'
                }
                else{
                    return '#3498DB'
                }
            })
            .attr('transform','translate(160, 15)')


var title = svg.append('g').attr('class', 'titles')

title.append('text')
     .text(book_data[0].name)
     .style("font-size", "20px")
     .attr('text-anchor', 'middle')
     .attr('fill', '#273746')
     .attr("font-family", "Roboto")
     .attr('transform', 'translate(0, 50)')


title.append('text')
     .text(book_data[0].author)
     .style("font-size", "15px")
     .attr('text-anchor', 'middle')
     .attr('fill', '#808B96')
     .attr("font-family", "Roboto")
     .attr('transform', 'translate(0, 70)')


title.append('text')
     .text(book_data[0].read_by)
     .style("font-size", "12px")
     .attr('text-anchor', 'middle')
     .attr('fill', '#808B96')
     .attr("font-family", "Roboto")
     .attr('transform', 'translate(0, 90)')


//legend 
var legendgroup = svg.append('g').attr('transform', `translate(300, 0)`);

const legend = d3.legendColor()
            .shape('circle')
            .shapePadding(10)
            .scale(colour_scale);


legendgroup.call(legend);
legendgroup.selectAll('text').attr("font-family", "Roboto");





//.attr('transform', `rotate(${90 + i* (180 / (no_of_page_lines + 2 ))},0,0)`); 