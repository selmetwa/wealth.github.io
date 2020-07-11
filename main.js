// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 445 - margin.left - margin.right,
  height = 445 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

d3.csv("wealth.csv", function(error, data) {
    const countries = data;
    let realCountries = []
    let continentTotals = []
    let totalWealth = 0;
    let asiaPacific = []
    let africa = []
    let europe = []
    let northAmerica = []
    let latinAmerica = []
    countries.forEach(country => {
        let countryObj = {
            name: country.Country,
            region: country.Region,
            wealth: Number(country['Wealth ($B)'].slice(1,country['Wealth ($B)'].length).replace(/,/g, '')),
            percentage: (Number(country['Wealth ($B)'].slice(1,country['Wealth ($B)'].length).replace(/,/g, '')) / 360474 * 100)
        }
        realCountries.push(countryObj)
    })
    realCountries.forEach(country => {
        let countryWealth = country.wealth
        if (country.region == 'Africa') {
            africa.push(country)
        } else if (country.region == 'Asia-Pacific' || country.region == 'China' || country.region == 'India') {
            asiaPacific.push(country)
        } else if (country.region == 'Latin America') {
            latinAmerica.push(country)
        } else if (country.region == 'Europe') {
            europe.push(country)
        } else {
            northAmerica.push(country)
        }
        totalWealth += countryWealth
    })
    console.log('realCountries: ', realCountries)

    let africaTotal = 0
    africa.forEach(country => {
        africaTotal += country.wealth
    })
    africa.push({
        name: 'Africa Total',
        region: 'Africa',
        total: africaTotal,
        percentage: africaTotal / totalWealth * 100
    })

    continentTotals.push({
        name: 'Africa',
        total: africaTotal,
        percentage: africaTotal / totalWealth * 100
    })

    let asiaPacificTotal = 0
    asiaPacific.forEach(country => {
        asiaPacificTotal += country.wealth
    })
    asiaPacific.push({
        name: 'Asia-Pacific Total',
        region: 'Asia-Pacific',
        total: asiaPacificTotal,
        percentage: asiaPacificTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'Asia-Pacific',
        total: asiaPacificTotal,
        percentage: asiaPacificTotal / totalWealth * 100
    })

    let europeTotal = 0
    europe.forEach(country => {
        europeTotal += country.wealth
    })
    europe.push({
        name: 'Europe Total',
        region: 'Europe',
        total: europeTotal,
        percentage: europeTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'Europe',
        total: europeTotal,
        percentage: europeTotal / totalWealth * 100
    })

    let northAmericaTotal = 0
    northAmerica.forEach(country => {
        northAmericaTotal += country.wealth
    })
    northAmerica.push({
        name: 'North America Total',
        region: 'North America',
        total: northAmericaTotal,
        percentage: northAmericaTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'North America',
        total: northAmericaTotal,
        percentage: northAmericaTotal / totalWealth * 100
    })

    let latinAmericaTotal = 0
    latinAmerica.forEach(country => {
        latinAmericaTotal += country.wealth
    })
    latinAmerica.push({
        name: 'Latin America Total',
        region: 'Latin America',
        total: latinAmericaTotal,
        percentage: latinAmericaTotal / totalWealth * 100
    })

    continentTotals.push({
        name: 'Latin America',
        total: latinAmericaTotal,
        percentage: latinAmericaTotal / totalWealth * 100
    })
    console.log('africaTotal: ', africaTotal)
    console.log('totalWealth: ', totalWealth)
    console.log('asiaPacific: ', asiaPacific)
    console.log('africa: ', africa)
    console.log('europe: ', europe)
    console.log('northAmerica: ', northAmerica)
    console.log('latinAmerica: ', latinAmerica)
    console.log('continentTotals: ', continentTotals)
})