fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json').
then(response => response.json()).
then(dataCounty => {
  fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json').
  then(response => response.json()).
  then(dataEduc => {
    const mapHeight = 600;
    const mapWidth = 950;
    const colorBank = ['#CCE5FF', '#99CCFF', '#66B2FF', '#3399FF', '#0080FF'];
    const svg = d3.select('#map').append('svg').attr('height', mapHeight).attr('width', mapWidth);
    const colorScale = d3.scaleQuantize().
    range(colorBank).
    domain(d3.extent(dataEduc, a => a.bachelorsOrHigher));
    d3.select('#map').append('div').attr('id', 'tooltip').attr('style', 'position: absolute; opacity: 0;');
    svg.append('g').attr('id', 'usMap').
    selectAll('path').
    data(topojson.feature(dataCounty, dataCounty.objects.counties).features).
    enter().
    append('path').
    attr('d', d3.geoPath()).
    attr('class', 'county').
    attr('data-education', a => dataEduc.find(b => b.fips === a.id).bachelorsOrHigher).
    attr('data-fips', a => a.id).
    attr('fill', a => colorScale(dataEduc.find(b => b.fips === a.id).bachelorsOrHigher)).
    on('mouseover', function (d, i) {
      d3.select('#tooltip').
      attr('data-education', dataEduc.find(b => b.fips === i.id).bachelorsOrHigher).
      html('<p>County: ' + dataEduc.find(b => b.fips === i.id).area_name + '</p><p>State: ' + dataEduc.find(b => b.fips === i.id).state + '</p><p>Education: ' + dataEduc.find(b => b.fips === i.id).bachelorsOrHigher + '</p>').
      style('opacity', 1);
    }).
    on('mouseout', function () {
      d3.select('#tooltip').style('opacity', 0);
    }).
    on('mousemove', function () {
      d3.select('#tooltip').style('left', event.pageX + 20 + 'px').style('top', event.pageY - 40 + 'px');
    });
    const legendHeight = 30;
    const legendWidth = 200;
    const legendPadding = 30;
    const legend = d3.select('#legendCont').
    append('svg').
    attr('height', legendHeight + legendPadding).
    attr('width', legendWidth + legendPadding).
    attr('id', 'legend');
    const legendTickValues = [colorScale.invertExtent(colorBank[0])[0]];
    colorBank.forEach(a => {
      legendTickValues.push(colorScale.invertExtent(a)[1]);
    });
    const legendScale = d3.scaleLinear().
    domain(d3.extent(dataEduc, a => a.bachelorsOrHigher)).
    range([legendPadding, legendWidth - legendPadding]);
    const legendColorBand = d3.scaleBand().
    domain(colorBank).
    range(d3.extent(dataEduc, a => a.bachelorsOrHigher));
    const legendAxis = d3.axisBottom().scale(legendScale).
    tickValues(legendTickValues).
    tickFormat(d => d3.format(".1f")(d));
    legend.selectAll('rect').
    data(colorBank.map(a => legendColorBand(a))).
    enter().
    append('rect').
    attr('width', (legendWidth - 2 * legendPadding) / colorBank.length).
    attr('height', legendHeight).
    attr('x', a => legendScale(a)).
    attr('y', 0).
    attr('fill', a => colorScale(a));
    legend.append('g').
    attr('transform', 'translate(0,' + legendHeight + ')').
    attr('id', 'legend-axis').
    call(legendAxis);
  });});