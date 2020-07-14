/* |||||||||||||||||| REGIONS |||||||||||||||||||| */
let africa = [
    'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad',
    'Comoros', 'Congo, Rep.', "Cote d'Ivoire", 'Equatorial Guinea', 'Eritrea', 'Swaziland', 'Ethiopia', 'Gabon', 'Gambia',
    'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 
    'Mauritius', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles',
    'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Uganda', 'Zambia', 'Zimbabwe', 
    'Mayotte', 'Congo, Dem. Rep.', 'Reunion',
]

let mena = [
    'Algeria', 'Bahrain', 'Egypt', 'Iran', 'Iraq', 'Israel', 'Jordan', 'Kuwait', 'Lebanon', 'Libya', 'Morocco', 'Oman',
    'Palestine', 'Qatar', 'Saudi Arabia', 'Syria', 'Tunisia', 'Turkey', 'United Srab Emirates', 'Yemen', 'Djibouti',
    'United Arab Emirates'
]

let eastAsia = ['China', 'Japan', 'Korea', 'Korea, North', 'Hong Kong SAR', 'Taiwan (Chinese Taipei)', 'Macao']

let india = ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Bhutan', 'Maldives', 'Nepal']

let centralAsia = 
[
    'Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Uzbekistan', 'Armenia', 'Azerbaijan','Georgia', 'Mongolia', 'Afghanistan'
]

let southEastAsia = 
[
    'Brunei', 'Cambodia', 'East Timor', 'Singapore', 'Thailand', 'Vietnam', 'Philippines', 'Malaysia', 'Laos', 'Myanmar', 
    'Indonesia',
]

let oceania = [
    'Australia', 'New Zealand', 'Fiji', 'Samoa', 'Micronesia', 'Vanuatu', 'Guam', 'Kiribati', 'Tonga', 'Palau', 'Papua New Guinea',
    'Tuvalu', 'Marshall Islands', 'New Caledonia', 'French Polynesia', 'Timor-Leste', 'Solomon Islands', 'American Samoa'
]

let westernEurope = [
    'France', 'Germany', 'Spain', 'Portugal', 'Belgium', 'Austria', 'Andorra', 
    'Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden', 'United Kingdom', 'Italy', 'Switzerland', 'Netherlands', 'Luxembourg',
    'Monaco', 'San Marino', 'Isle of Man', 'Faeroe Islands', 'Ireland', 'Liechtenstein', 'Greece', 'Cyprus', 'Malta'
]

let easternEurope = [
    'Russia', 'Czech Republic', 'Poland', 'Croatia', 'Slovakia', 'Hungary', 'Romania', 'Moldova', 'Serbia', 'Lithuania',
    'Latvia', 'Estonia','Slovenia', 'Bulgaria', 'Ukraine', 'Belarus', 'Montenegro', 'Bosnia & Herzegovina', 'Albania', 'Kosovo', 'Macedonia'
]

/* |||||||||||||||||| REGIONS |||||||||||||||||||| */
// set the dimensions and margins of the graph

function loadBubbles() {
document.querySelector('#chart').innerHTML = ''
d3.csv("wealth.csv", function(error, data) {
    let realCountries = []
    let countries = []
    let continentTotals = []
    let totalWealth = 0;
    
    let africanCountries = []
    let menaCountries = []
    let easternEuropeanCountries = []
    let westernEuropeanCountries = []
    let eastAsianCountries = []
    let centralAsianCountries = []
    let southEastAsianCountries = []
    let indianSubcontinentCountries = []
    let northAmericanCountries = []
    let latinAmericanCountries = []
    let oceaniaCountries = []
    let leftover = []
    data.forEach(country => {
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
        if (africa.includes(country.name)) {
            countries.push({
                name: country.name,
                region: 'Africa',
                position: 'Global South',
                wealth: country.wealth,
                percentage: country.percentage
            })
            africanCountries.push(country)
        } else if (mena.includes(country.name) && country.name != 'Israel') {
            countries.push({
                name: country.name,
                region: 'Middle East & North Africa',
                position: 'Global South',
                wealth: country.wealth,
                percentage: country.percentage
            })
            menaCountries.push(country)
        } else if (country.name == 'Israel') {
            countries.push({
                name: country.name,
                region: 'Middle East & North Africa',
                position: 'Global North',
                wealth: country.wealth,
                percentage: country.percentage
            })
            menaCountries.push(country)
        }
            else if (eastAsia.includes(country.name) && country.name !== 'Japan' && country.name !== 'Korea') {
            countries.push({
                name: country.name,
                region: 'East Asia',
                position: 'Global South',
                wealth: country.wealth,
                percentage: country.percentage
            })
            eastAsianCountries.push(country)
        } else if (country.name == 'Japan' || country.name == 'Korea') {
            countries.push({
                name: country.name,
                region: 'East Asia',
                position: 'Global North',
                wealth: country.wealth,
                percentage: country.percentage
            })
            eastAsianCountries.push(country)
        }
         else if (easternEurope.includes(country.name)) {
            countries.push({
                name: country.name,
                region: 'Eastern Europe',
                position: 'Global North',
                wealth: country.wealth,
                percentage: country.percentage
            })
            easternEuropeanCountries.push(country)
        } else if (westernEurope.includes(country.name)) {
            countries.push({
                name: country.name,
                region: 'Western Europe',
                position: 'Global North',
                wealth: country.wealth,
                percentage: country.percentage
            })
            westernEuropeanCountries.push(country)
        } else if (india.includes(country.name)) {
            countries.push({
                name: country.name,
                region: 'Indian Subcontinent',
                position: 'Global South',
                wealth: country.wealth,
                percentage: country.percentage
            })
            indianSubcontinentCountries.push(country)
        } else if (centralAsia.includes(country.name)) {
            countries.push({
                name: country.name,
                region: 'Central Asia',
                position: 'Global South',
                wealth: country.wealth,
                percentage: country.percentage
            })
            centralAsianCountries.push(country)
        } else if (southEastAsia.includes(country.name) && country.name != 'Singapore') {
            countries.push({
                name: country.name,
                region: 'South East Asia',
                position: 'Global South',
                wealth: country.wealth,
                percentage: country.percentage
            })
            southEastAsianCountries.push(country)
        } else if (country.name == 'Singapore') {
            countries.push({
                name: country.name,
                region: 'South East Asia',
                position: 'Global North',
                wealth: country.wealth,
                percentage: country.percentage
            })
            southEastAsianCountries.push(country)
        }
        else if (oceania.includes(country.name) && country.name != 'Australia' && country.name != 'New Zealand') {
            countries.push({
                name: country.name,
                region: 'Oceania',
                position: 'Global South',
                wealth: country.wealth,
                percentage: country.percentage
            })
            oceaniaCountries.push(country)
        } else if (country.name == 'Australia' || country.name == 'New Zealand') {
            countries.push({
                name: country.name,
                region: 'Oceania',
                position: 'Global North',
                wealth: country.wealth,
                percentage: country.percentage
            })
            oceaniaCountries.push(country)
        }
        else if (country.region == 'North America') {
            let percentage = country.percentage.toString()
            countries.push({
                name: country.name,
                region: 'North America',
                position: 'Global North',
                wealth: country.wealth,
                percentage: country.percentage
            })
            northAmericanCountries.push(country)
        } else if (country.region == 'Latin America') {
            let percentage = toString(country.percentage)
            countries.push({
                name: country.name,
                region: 'Latin America',
                position: 'Global South',
                wealth: country.wealth,
                percentage: country.percentage
            })
            latinAmericanCountries.push(country)
        } else {
            leftover.push(country)
        }
        totalWealth += countryWealth
    })

    // afrique
    let africaTotal = 0
    africanCountries.forEach(country => {
        africaTotal += country.wealth
    })
    africanCountries.push({
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

    // east asia
    let eastAsiaTotal = 0
    eastAsianCountries.forEach(country => {
        eastAsiaTotal += country.wealth
    })
    eastAsianCountries.push({
        name: 'East Asia Total',
        region: 'East Asia',
        total: eastAsiaTotal,
        percentage: eastAsiaTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'East Asia',
        total: eastAsiaTotal,
        percentage: eastAsiaTotal / totalWealth * 100
    })

    // south east asia
    let southAsiaTotal = 0
    southEastAsianCountries.forEach(country => {
        southAsiaTotal += country.wealth
    })
    southEastAsianCountries.push({
        name: 'South Asia Total',
        region: 'South Asia',
        total: southAsiaTotal,
        percentage: southAsiaTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'South East Asia',
        total: southAsiaTotal,
        percentage: southAsiaTotal / totalWealth * 100
    })

    // india
    let indiaTotal = 0
    indianSubcontinentCountries.forEach(country => {
        indiaTotal += country.wealth
    })
    indianSubcontinentCountries.push({
        name: 'Indian Subcontinent',
        region: 'Indian Subcontinent',
        total: indiaTotal,
        percentage: indiaTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'Indian Subcontinent',
        total: indiaTotal,
        percentage: indiaTotal / totalWealth * 100
    })

    // central asia
    let centralAsiaTotal = 0
    centralAsianCountries.forEach(country => {
        centralAsiaTotal += country.wealth
    })
    centralAsianCountries.push({
        name: 'Central Asia',
        region: 'Central Asia',
        total: centralAsiaTotal,
        percentage: centralAsiaTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'Central Asia',
        total: centralAsiaTotal,
        percentage: centralAsiaTotal / totalWealth * 100
    })

    // mena 
    let menaTotal = 0
    menaCountries.forEach(country => {
        menaTotal += country.wealth
    })
    menaCountries.push({
        name: 'MENA',
        region: 'MENA',
        total: menaTotal,
        percentage: menaTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'MENA',
        total: menaTotal,
        percentage: menaTotal / totalWealth * 100
    })

    // eastern europe 
    let easternEuropeTotal = 0
    easternEuropeanCountries.forEach(country => {
        easternEuropeTotal += country.wealth
    })
    easternEuropeanCountries.push({
        name: 'Eastern Europe',
        region: 'Eastern Europe',
        total: easternEuropeTotal,
        percentage: easternEuropeTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'Eastern Europe',
        total: easternEuropeTotal,
        percentage: easternEuropeTotal / totalWealth * 100
    })

    // western europe 
    let westernEuropeTotal = 0
    westernEuropeanCountries.forEach(country => {
        westernEuropeTotal += country.wealth
    })
    westernEuropeanCountries.push({
        name: 'Western Europe',
        region: 'Western Europe',
        total: westernEuropeTotal,
        percentage: westernEuropeTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'Western Europe',
        total: westernEuropeTotal,
        percentage: westernEuropeTotal / totalWealth * 100
    })

    // north america 
    let northAmericanTotal = 0
    northAmericanCountries.forEach(country => {
        northAmericanTotal += country.wealth
    })
    northAmericanCountries.push({
        name: 'North America',
        region: 'North America',
        total: northAmericanTotal,
        percentage: northAmericanTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'North America',
        total: northAmericanTotal,
        percentage: northAmericanTotal / totalWealth * 100
    })

    // latin america 
    let latinAmericanTotal = 0
    latinAmericanCountries.forEach(country => {
        latinAmericanTotal += country.wealth
    })
    latinAmericanCountries.push({
        name: 'Latin America',
        region: 'Latin America',
        total: latinAmericanTotal,
        percentage: latinAmericanTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'Latin America',
        total: latinAmericanTotal,
        percentage: latinAmericanTotal / totalWealth * 100
    })

    // latin america 
    let oceaniaTotal = 0
    oceaniaCountries.forEach(country => {
        oceaniaTotal += country.wealth
    })
    oceaniaCountries.push({
        name: 'Oceania',
        region: 'Oceania',
        total: oceaniaTotal,
        percentage: oceaniaTotal / totalWealth * 100
    })
    continentTotals.push({
        name: 'Oceania',
        total: oceaniaTotal,
        percentage: oceaniaTotal / totalWealth * 100
    })

    const globalNorth = countries.filter(country => country.position == 'Global North')
    const globalSouth = countries.filter(country => country.position == 'Global South')
    // console.log('globalNorth: ', globalNorth)
    // console.log('globalSouth: ', globalSouth)
    // console.log('countries: ', countries)
    // console.log('data: ', data)
    // console.log('africanCountries: ', africanCountries)
    // console.log('menaCountries: ', menaCountries)
    // console.log('easternEuropeanCountries: ', easternEuropeanCountries)
    // console.log('westernEuropeanCountries: ', westernEuropeanCountries)
    // console.log('easternEuropeanCountries: ', easternEuropeanCountries)
    // console.log('eastAsianCountries: ', eastAsianCountries)
    // console.log('southEastAsianCountries: ', southEastAsianCountries)
    // console.log('indianSubcontinentCountries: ', indianSubcontinentCountries)
    // console.log('northAmericanCountries: ', northAmericanCountries)
    // console.log('latinAmericanCountries: ', latinAmericanCountries)
    // console.log('oceaniaCountries: ', oceaniaCountries)
    // console.log('leftover: ', leftover)
    // console.log('continentTotals: ', continentTotals)

    // Chart
        let width = 1800,
        height = 1400

        const tip = d3.tip()
        .attr('class', 'first-d3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return `
            <div class="scatterplot-tooltip">
                <h1>Country: ${d.name}</h1>
                <h3>Wealth in Billions: <span>$${d.wealth}</span></h1>
                <h3>Percentage of the World's Wealth: <span>${d.percentage.toString().slice(0, 4)}%</span></h1>
            </div>
            `
        })

        const svg = d3.select('#chart')
            .append("svg")
            .attr('height', height)
            .attr('width', width)
            .append("g")
            .attr('class', 'wrapper')
            .attr("transform", `translate(${width / 2}, ${height / 2})`)
        
        svg.call(tip);

        const radius = d3.scaleSqrt().domain([1, 105990]).range([3, 225])

        // the simulation is a collection of forces
        // about where we want our circles to go
        // and how we want our circles to interact
        const simulation = d3.forceSimulation()
            .force('x', d3.forceX().strength(0.005))
            .force('y', d3.forceY().strength(0.005))
            .force("collide", d3.forceCollide(function(d) {
                return radius(d.wealth) + 4
            }))

        let targetCountries = getSpecificCountries()
        let circles = svg.selectAll('.dot')
            .data(countries)
            .enter().append("circle")
            .attr('class', 'dot')
            .attr("r", function(d) {
                return radius(d.wealth)
            })
            .attr("fill", '#EBEBEB')
            .attr("stroke", '#cccccc')
            .attr('stroke-width', '1.5px')
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
        
        simulation.nodes(countries)
            .on('tick', ticked)

        function ticked() {
            circles
            .attr("cx", function(d) {
                return d.x
            })
            .attr("cy", function(d) {
                return d.y
            })
        }

        d3.selectAll('.dot')
        .filter(function(d) {return targetCountries.includes(d.name )})
        .classed('specificCountry', function(d) {return targetCountries.includes(d.name)})


$('.country-select').selectpicker();

function getSpecificCountries() {
    const values = Array.from(document.querySelectorAll('.country-select option:checked')).map(el => el.value);
    return values
}
let values = getSpecificCountries()

})

}

window.onload = function() {
    loadBubbles();
};


document.querySelector('.country-select').onchange = loadBubbles