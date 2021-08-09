fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').
then(response => response.json()).
then(data => {
  const baseTemp = data.baseTemperature;
  const monthlyVar = data.monthlyVariance.map(a => ({
    year: a.year,
    month: a.month,
    variance: a.variance,
    temp: baseTemp + a.variance }));

  const height = 500;
  const width = 1400;
  const verticalPadding = 50;
  const horizontalPadding = 150;
  const svg = d3.select('#map').append('svg').attr('height', height).attr('width', width);
  const xScale = d3.scaleBand().
  range([horizontalPadding, width - horizontalPadding]).
  domain(monthlyVar.map(a => a.year));
  const yScale = d3.scaleBand().
  domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).
  range([verticalPadding, height - verticalPadding]);
  const xAxis = d3.axisBottom().scale(xScale).
  tickValues(
  xScale.domain().filter(function (year) {
    // set ticks to years divisible by 10
    return year % 10 === 0;
  }));

  const yAxis = d3.axisLeft().scale(yScale).
  tickFormat(function (month) {
    var date = new Date(0);
    date.setUTCMonth(month);
    return d3.timeFormat('%B')(date);
  });
  d3.select('#map').append('div').attr('id', 'tooltip').attr('style', 'position: absolute; opacity: 0;');
  const colorRange = ['#0066CC', '#0080FF', '#3399FF', '#66B2FF', '#FFB266', '#FF9933', '#FF8000', '#CC6600', '#CC0000'];
  const colorScale = d3.scaleQuantize().
  range(colorRange).
  domain(d3.extent(monthlyVar, a => a.temp));
  svg.selectAll('rect').
  data(monthlyVar).
  enter().
  append('rect').
  attr('height', (height - verticalPadding) / 12 - 4).
  attr('width', (width - 2 * horizontalPadding) / Math.floor(monthlyVar.length / 12)).
  attr('x', (a, i) => xScale(a.year)).
  attr('y', (a, i) => yScale(a.month)).
  attr('class', 'cell').
  attr('fill', a => colorScale(a.temp)).
  attr('data-month', a => a.month - 1).
  attr('data-year', a => a.year).
  attr('data-temp', a => a.temp).
  on('mouseover', function (d, i) {
    d3.select('#tooltip').attr('data-year', i.year).html('<p>Year: ' + i.year + '</p><p>Temperature: ' + i.temp.toFixed(2) + '</p><p>Variance: ' + i.variance + '</p>').style('opacity', 1);
    d3.select(this).style('fill', 'white');
  }).
  on('mouseout', function () {
    d3.select('#tooltip').style('opacity', 0);
    d3.select(this).style('fill', a => colorScale(a.temp));
  }).
  on('mousemove', function () {
    d3.select('#tooltip').style('left', event.pageX + 20 + 'px').style('top', event.pageY - 40 + 'px');
  });
  svg.append('g').
  attr('transform', 'translate(0,' + (height - verticalPadding) + ')').
  attr('id', 'x-axis').
  call(xAxis);
  svg.append('g').
  attr('transform', 'translate(' + horizontalPadding + ', 0)').
  attr('id', 'y-axis').
  call(yAxis);
  const legendHeight = 40;
  const legendWidth = 300;
  const legendPadding = 30;
  const legend = d3.select('#legendCont').
  append('svg').
  attr('height', legendHeight + legendPadding).
  attr('width', legendWidth + legendPadding).
  attr('id', 'legend');
  const legendTickValues = [colorScale.invertExtent(colorRange[0])[0]];
  colorRange.forEach(a => {
    legendTickValues.push(colorScale.invertExtent(a)[1]);
  });
  const legendScale = d3.scaleLinear().
  domain(d3.extent(monthlyVar, a => a.temp)).
  range([legendPadding, legendWidth - legendPadding]);
  const legendColorBand = d3.scaleBand().
  domain(colorRange).
  range(d3.extent(monthlyVar, a => a.temp));
  const legendAxis = d3.axisBottom().scale(legendScale).
  tickValues(legendTickValues).
  tickFormat(d => d3.format(".1f")(d));
  legend.selectAll('rect').
  data(colorRange.map(a => legendColorBand(a))).
  enter().
  append('rect').
  attr('width', (legendWidth - 2 * legendPadding) / colorRange.length).
  attr('height', legendHeight).
  attr('x', a => legendScale(a)).
  attr('y', 0).
  attr('fill', a => colorScale(a));
  legend.append('g').
  attr('transform', 'translate(0,' + legendHeight + ')').
  attr('id', 'legend-axis').
  call(legendAxis);


});