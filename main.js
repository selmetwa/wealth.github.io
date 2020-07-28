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

let pacific = [
    'Brunei', 'Cambodia', 'East Timor', 'Singapore', 'Thailand', 'Vietnam', 'Philippines', 'Malaysia', 'Laos', 'Myanmar', 
    'Indonesia', 'Australia', 'New Zealand', 'Fiji', 'Samoa', 'Micronesia', 'Vanuatu', 'Guam', 'Kiribati', 'Tonga', 'Palau', 'Papua New Guinea',
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

let regionIsClicked
let globalIsClicked
let combineIsClicked

const isLaptop = window.innerWidth <= 1900 ? true : false;
const isMobile = window.matchMedia('screen and (max-width: 768px)').matches

function loadBubbles() {
let totalPopulation = 0;
let globalNorthPop = 0;
let globalSouthPop = 0;
d3.csv('data/pop.csv', function(error, pop) {
    pop.forEach(country => {
        let pop = Number(country.population.replace(/,/g, ''))
        totalPopulation += pop
    })
document.querySelector('#chart').innerHTML = ''
d3.csv("data/wealth.csv", function(error, data) {
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
    let indianSubcontinentCountries = []
    let northAmericanCountries = []
    let latinAmericanCountries = []
    let pacificCountries = []
    let leftover = []
    data.forEach(country => {
        if (country.Region != 'top' && country.Region != 'bottom') {
            let countryObj = {
                name: country.Country,
                region: country.Region,
                wealth: Number(country['Wealth ($B)'].slice(1,country['Wealth ($B)'].length).replace(/,/g, '')),
                percentage: (Number(country['Wealth ($B)'].slice(1,country['Wealth ($B)'].length).replace(/,/g, '')) / 360474 * 100)
            }
            realCountries.push(countryObj)
        } else {
                let countryObj = {
                    name: country.Country,
                    region: country.Region,
                    wealth: 360474 * ((Number(country['Wealth ($B)'].slice(1,3))) / 100),
                    percentage: (Number(country['Wealth ($B)'].slice(1,3))),
                    population: '1%'
                }
            realCountries.push(countryObj)
        }
    })

    realCountries.slice(0, realCountries.length).forEach(country => {
            let countryWealth 
            if (country.wealth) {
                countryWealth = country.wealth
            } else {
                countryWealth = 0
            }
            if (africa.includes(country.name)) {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: country.name,
                    region: 'Africa',
                    position: 'Global South',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                africanCountries.push(country)
            } else if (mena.includes(country.name) && country.name != 'Israel') {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) {
                    currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))         
                } 
                countries.push({
                    name: country.name,
                    region: 'Middle East & North Africa',
                    position: 'Global South',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                menaCountries.push(country)
            } else if (country.name == 'Israel') {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: `${country.name}/Palestine`,
                    region: 'Middle East & North Africa',
                    position: 'Global North',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                menaCountries.push(country)
            }
                else if (eastAsia.includes(country.name) && country.name !== 'Japan' && country.name !== 'Korea') {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: country.name,
                    region: 'East Asia',
                    position: 'Global South',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                eastAsianCountries.push(country)
            } else if (country.name == 'Japan' || country.name == 'Korea') {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: country.name,
                    region: 'East Asia',
                    position: 'Global North',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                eastAsianCountries.push(country)
            }
             else if (easternEurope.includes(country.name)) {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: country.name,
                    region: 'Eastern Europe',
                    position: 'Global North',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                easternEuropeanCountries.push(country)
            } else if (westernEurope.includes(country.name)) {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: country.name,
                    region: 'Western Europe',
                    position: 'Global North',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                westernEuropeanCountries.push(country)
            } else if (india.includes(country.name)) {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: country.name,
                    region: 'Indian Subcontinent',
                    position: 'Global South',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                indianSubcontinentCountries.push(country)
            } else if (centralAsia.includes(country.name)) {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: country.name,
                    region: 'Central Asia',
                    position: 'Global South',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                centralAsianCountries.push(country)
            } else if (pacific.includes(country.name) && country.name != 'Singapore' && country.name !== 'Australia' && country.name !== 'New Zealand') {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: country.name,
                    region: 'Pacific',
                    position: 'Global South',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                pacificCountries.push(country)
            } else if (country.name == 'Singapore' || country.name == 'Australia' || country.name == 'New Zealand') {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: country.name,
                    region: 'Pacific',
                    position: 'Global North',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                pacificCountries.push(country)
            }
            else if (country.region == 'North America') {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                let percentage = country.percentage.toString()
                countries.push({
                    name: country.name,
                    region: 'North America',
                    position: 'Global North',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                northAmericanCountries.push(country)
            } else if (country.region == 'Latin America') {
                let currentCountry = pop.filter(test => test.indicator == country.name)
                let currentPopulation
                if (currentCountry.length > 0) { currentPopulation = Number(currentCountry[0].population.replace(/,/g, ''))} 
                countries.push({
                    name: country.name,
                    region: 'Latin America',
                    position: 'Global South',
                    wealth: country.wealth,
                    percentage: country.percentage,
                    population: currentPopulation
                })
                latinAmericanCountries.push(country)
            } else {
                countries.push(country)
                leftover.push(country)
            }
            totalWealth += countryWealth
    })
    // afrique
    let africaTotal = 0
    let africanTotalPercent = 0;
    africanCountries.forEach(country => {
        africaTotal += country.wealth
        africanTotalPercent += country.percentage
    })
    africanCountries.push({
        name: 'Africa Total',
        region: 'Africa',
        total: africaTotal,
        percentage: africanTotalPercent.toString().slice(0, 4)
    })
    continentTotals.push({
        name: 'Africa',
        total: africaTotal,
        percentage: africanTotalPercent.toString().slice(0, 4)
    })

    // east asia
    let eastAsiaTotal = 0
    let eastAsianTotalPercentage = 0
    eastAsianCountries.forEach(country => {
        eastAsiaTotal += country.wealth
        eastAsianTotalPercentage += country.percentage
    })
    eastAsianCountries.push({
        name: 'East Asia Total',
        region: 'East Asia',
        total: eastAsiaTotal,
        percentage: eastAsianTotalPercentage.toString().slice(0, 4) 
    })
    continentTotals.push({
        name: 'East Asia',
        total: eastAsiaTotal,
        percentage: eastAsianTotalPercentage.toString().slice(0, 4)
    })

    // india
    let indiaTotal = 0
    let indiaTotalPercentage = 0
    indianSubcontinentCountries.forEach(country => {
        indiaTotal += country.wealth
        indiaTotalPercentage += country.percentage
    })
    indianSubcontinentCountries.push({
        name: 'Indian Subcontinent',
        region: 'Indian Subcontinent',
        total: indiaTotal,
        percentage: indiaTotalPercentage.toString().slice(0, 4)
    })
    continentTotals.push({
        name: 'Indian Subcontinent',
        total: indiaTotal,
        percentage: indiaTotalPercentage.toString().slice(0, 4)
    })

    // central asia
    let centralAsiaTotal = 0
    let centralAsiaTotalPercentage = 0
    centralAsianCountries.forEach(country => {
        centralAsiaTotal += country.wealth
        centralAsiaTotalPercentage += country.percentage
    })
    centralAsianCountries.push({
        name: 'Central Asia',
        region: 'Central Asia',
        total: centralAsiaTotal,
        percentage: centralAsiaTotalPercentage.toString().slice(0, 4)
    })
    continentTotals.push({
        name: 'Central Asia',
        total: centralAsiaTotal,
        percentage: centralAsiaTotalPercentage.toString().slice(0, 4)
    })

    // mena 
    let menaTotal = 0
    let menaTotalPercentage = 0
    menaCountries.forEach(country => {
        menaTotal += country.wealth
        menaTotalPercentage += country.percentage
    })
    menaCountries.push({
        name: 'MENA',
        region: 'MENA',
        total: menaTotal,
        percentage: menaTotalPercentage.toString().slice(0, 4)
    })
    continentTotals.push({
        name: 'MENA',
        total: menaTotal,
        percentage: menaTotalPercentage.toString().slice(0, 4)
    })

    // eastern europe 
    let easternEuropeTotal = 0
    let easternEuropeTotalPercentage = 0
    easternEuropeanCountries.forEach(country => {
        easternEuropeTotal += country.wealth
        easternEuropeTotalPercentage += country.percentage
    })
    easternEuropeanCountries.push({
        name: 'Eastern Europe',
        region: 'Eastern Europe',
        total: easternEuropeTotal,
        percentage: easternEuropeTotalPercentage.toString().slice(0,4)
    })
    continentTotals.push({
        name: 'Eastern Europe',
        total: easternEuropeTotal,
        percentage: easternEuropeTotalPercentage.toString().slice(0,4)
    })

    // western europe 
    let westernEuropeTotal = 0
    let westernEuropeTotalPercentage = 0
    westernEuropeanCountries.forEach(country => {
        westernEuropeTotal += country.wealth
        westernEuropeTotalPercentage += country.percentage
    })
    westernEuropeanCountries.push({
        name: 'Western Europe',
        region: 'Western Europe',
        total: westernEuropeTotal,
        percentage: westernEuropeTotalPercentage.toString().slice(0,4)
    })
    continentTotals.push({
        name: 'Western Europe',
        total: westernEuropeTotal,
        percentage: westernEuropeTotalPercentage.toString().slice(0,4)
    })

    // north america 
    let northAmericanTotal = 0
    let northAmericanTotalPercent = 0
    northAmericanCountries.forEach(country => {
        northAmericanTotal += country.wealth
        northAmericanTotalPercent += country.percentage
    })
    northAmericanCountries.push({
        name: 'North America',
        region: 'North America',
        total: northAmericanTotal,
        percentage: northAmericanTotalPercent.toString().slice(0, 4)
    })
    continentTotals.push({
        name: 'North America',
        total: northAmericanTotal,
        percentage: northAmericanTotalPercent.toString().slice(0, 4)
    })

    // latin america 
    let latinAmericanTotal = 0
    let latinAmericanTotalPercentage = 0
    latinAmericanCountries.forEach(country => {
        latinAmericanTotal += country.wealth
        latinAmericanTotalPercentage += country.percentage
    })
    latinAmericanCountries.push({
        name: 'Latin America',
        region: 'Latin America',
        total: latinAmericanTotal,
        percentage: latinAmericanTotalPercentage.toString().slice(0,4)
    })
    continentTotals.push({
        name: 'Latin America',
        total: latinAmericanTotal,
        percentage: latinAmericanTotalPercentage.toString().slice(0,4)
    })

    let pacificTotal = 0
    let pacificTotalPercentage = 0
    pacificCountries.forEach(country => {
        pacificTotal += country.wealth
        pacificTotalPercentage += country.percentage
    })
    continentTotals.push({
        name: 'Pacific',
        total: pacificTotal,
        percentage: pacificTotalPercentage.toString().slice(0,4)
    })

    const globalNorth = countries.filter(country => country.position == 'Global North')
    let globalNorthCountries = []
    globalNorth.forEach(country => {
        globalNorthCountries.push(country.name)
    })
    pop.forEach(country => {
        if (globalNorthCountries.includes(country.indicator)) {
            let pop = Number(country.population.replace(/,/g, ''))
            globalNorthPop += pop
        }
    })
    const globalSouth = countries.filter(country => country.position == 'Global South')
    let globalSouthCountries = []
    globalSouth.forEach(country => {
        globalSouthCountries.push(country.name)
    })
    pop.forEach(country => {
        if (globalSouthCountries.includes(country.indicator)) {
            let pop = Number(country.population.replace(/,/g, ''))
            globalSouthPop += pop
        }
    })

    // Chart
    let width,
    height

    if (isLaptop) {
        width = 1500
        height = 1100
    } else {
        width = 2000
        height = 1200
    }
    

    const tip = d3.tip()
    .attr('class', 'first-d3-tip')
    .offset([-10, 0])
    .html(function(d) {
        if (d.name != 'onePercent' && d.name != 'ninetyNinePercent') {
            return `
            <div class="scatterplot-tooltip">
                <h1>Country: ${d.name}</h1>
                <h3>Wealth in Billions: <span>$${d.wealth}</span></h1>
                <h3>Percentage of the World's Wealth: <span>${d.percentage.toString().slice(0, 4)}%</span></h1>
                <h3>Percentage of the World's Population: <span>${(d.population / totalPopulation * 100).toString().slice(0, 4)}%</span></h1>
            </div>
            `
        } 
    })

    const svg = d3.select('#chart')
        .append("svg")
        .attr('height', height)
        .attr('width', width)
        .append("g")
        .attr('class', 'wrapper')
        .attr("transform", isLaptop ? `translate(0,${height / 3})` : `translate(0,${height / 2.5})`)
    
    svg.call(tip);

    let radius
    if (isLaptop) {
        radius = d3.scaleSqrt().domain([1, 105990]).range([2, 130])
    } else {
        radius = d3.scaleSqrt().domain([1, 105990]).range([2, 160])
    }
    // radius = d3.scaleSqrt().domain([1, 105990]).range([2, 150])

    // the simulation is a collection of forces
    // about where we want our circles to go
    // and how we want our circles to interact
    const forceX = d3.forceX(function(d) {
        if (isLaptop) {
            if (d.position === 'Global North') {
                return 360
            } else {
                return 1000
            }
        } else {
            if (d.position === 'Global North') {
                return 500
            } else {
                return 1400
            }
        }
    }).strength(0.05)


    const forceY = d3.forceY(function(d) {
        if (isLaptop) {
            if (d.position === 'Global North') {
                return -75
            } else {
                return -110
            }
        } else {
            if (d.position === 'Global North') {
                return -100
            } else {
                return -150
            }
        }
        
    }).strength(0.05)

    const forceXAgain = d3.forceX(function(d) {
        if (isLaptop) {
            if (d.region === 'Africa' || d.region === 'Middle East & North Africa') {
                return 450
            } else if (d.region === 'Pacific' || d.region == 'Indian Subcontinent') {
                return 150
            }
            else if (d.region === 'Western Europe' || d.region == 'North America') {
                return 750
            }
            else if (d.region === 'Eastern Europe' || d.region == 'Central Asia') {
                return 1025
            }
            else if (d.region === 'Latin America' || d.region == 'East Asia') {
                return 1275
            }
            else {
                return 200
            }
        } else {
            if (d.region === 'Africa' || d.region === 'Middle East & North Africa') {
                return 600
            } else if (d.region === 'Pacific' || d.region == 'Indian Subcontinent') {
                return 200
            }
            else if (d.region === 'Western Europe' || d.region == 'North America') {
                return 1000
            }
            else if (d.region === 'Eastern Europe' || d.region == 'Central Asia') {
                return 1400
            }
            else if (d.region === 'Latin America' || d.region == 'East Asia') {
                return 1700
            }
            else {
                return 200
            }
        }
        
    }).strength(0.05)

    const forceYAgain = d3.forceY(function(d) {
        if (isLaptop) {
            if (
                d.region === 'Africa' 
                || d.region === 'Pacific' 
                || d.region == 'Western Europe'
                || d.region == 'Eastern Europe'
                || d.region == 'Latin America'
                ) {
                return -200
            } 
            else {
                return 450
            }
        } else {
            if (
                d.region === 'Africa' 
                || d.region === 'Pacific' 
                || d.region == 'Western Europe'
                || d.region == 'Eastern Europe'
                || d.region == 'Latin America'
                ) {
                return -250
            } 
            else {
                return 500
            }
        }
        
    }).strength(0.05)

    const simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY().strength(0.05))
        .force("collide", d3.forceCollide(function(d) {
            if (d.region == 'Top' || d.region == 'bottom' || d.region == 'top') {
                return 0 
            } else {
                return radius(d.wealth) + 6
            }
        }))

    const combine = () => {
        let textWrappers = document.querySelectorAll('.text-wrapper')
        textWrappers.forEach(wrapper => {
            wrapper.style.display = 'none'
        })
        let regionTextWrapper = document.querySelectorAll('.region-text-wrapper')
        regionTextWrapper.forEach(wrapper => {
            wrapper.style.display = 'none'
        })
        let regionWrapper = document.querySelectorAll('.regions-wrapper');
        regionWrapper.forEach(wrapper => {
            wrapper.style.display = 'none'
        })
        simulation
            .force("x", d3.forceX(width / 2).strength(0.1))
            .force('y', d3.forceY().strength(0.1))
            .alphaTarget(.05)
            .restart()

        document.querySelector('.second-chart-wrapper').style.marginTop = '-10vh'

    }
    const regions = () => {
        let regionWrapper = document.querySelectorAll('.regions-wrapper');
        regionWrapper.forEach(wrapper => {
            wrapper.style.display = 'flex'
        })
        let textWrappers = document.querySelectorAll('.text-wrapper')
        textWrappers.forEach(wrapper => {
            wrapper.style.display = 'none'
        })
        let regionTextWrapper = document.querySelectorAll('.region-text-wrapper')
        regionTextWrapper.forEach(wrapper => {
            wrapper.style.display = 'flex'
        })
        simulation
            .force("x", forceXAgain)
            .force("y", forceYAgain)
            .alphaTarget(.3)
            .restart()

        document.querySelector('.second-chart-wrapper').style.marginTop = '70vh'
    }
    const breakGlobal = () => {
        let textWrappers = document.querySelectorAll('.text-wrapper')
        textWrappers.forEach(wrapper => {
            wrapper.style.display = 'block'
        })
        let regionTextWrapper = document.querySelectorAll('.region-text-wrapper')
        regionTextWrapper.forEach(wrapper => {
            wrapper.style.display = 'none'
        })

        let regionWrapper = document.querySelectorAll('.regions-wrapper');
        regionWrapper.forEach(wrapper => {
            wrapper.style.display = 'none'
        })
        simulation
            .force("x", forceX)
            .force('y', forceY)
            .alphaTarget(.1)
            .restart()

        document.querySelector('.second-chart-wrapper').style.marginTop = '-10vh'
    }

    d3.select('.combine').on('click', () => {
        regionIsClicked = false
        combineIsClicked = true
        globalIsClicked = false
        combine()
    })
    d3.select('.region').on('click', () => {
        regionIsClicked = true
        combineIsClicked = false
        globalIsClicked = false
        regions()
    })
    d3.select('.global').on('click', () => {
        regionIsClicked = false
        combineIsClicked = false
        globalIsClicked = true
        breakGlobal()
    })

    if (regionIsClicked) {
        regions()
    } else if (globalIsClicked) {
        breakGlobal()
    } else if (combineIsClicked){
        combine()
    }
    

    let targetCountries = getSpecificCountries()
    let circles = svg.selectAll('.dot')
        .data(countries)
        .enter().append("circle")
        .attr('class', 'dot')
        .attr("r", function(d) {
            if (d.region == 'Top' || d.region == 'bottom' || d.region == 'top') {
                return null
            } else {
                return radius(d.wealth)
            }
        })
        .attr("fill", '#CACAE3')
        .attr("stroke", '#BCBCDC')
        .attr('stroke-width', '3px')
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
let globalNorthTotalPercentage = 0;
let globalSouthTotalPercentage = 0;
globalNorth.forEach(country => {
    globalNorthTotalPercentage += country.percentage
})
globalSouth.forEach(country => {
    globalSouthTotalPercentage += country.percentage
})

let pacificPop = 0
let realPacificCountries = []
pacificCountries.forEach(country => { realPacificCountries.push(country.name)})
pop.forEach(country => {
    if (realPacificCountries.includes(country.indicator)) {
        let pop = Number(country.population.replace(/,/g, ''))
        pacificPop += pop
    }
})

let africaPop = 0
let realAfricanCountries = []
africanCountries.forEach(country => { realAfricanCountries.push(country.name)})
pop.forEach(country => {
    if (realAfricanCountries.includes(country.indicator)) {
        let pop = Number(country.population.replace(/,/g, ''))
        africaPop += pop
    }
})

let westernEuropePop = 0
let realWesternEuropeanCountries = []
westernEuropeanCountries.forEach(country => { realWesternEuropeanCountries.push(country.name)})
pop.forEach(country => {
    if (realWesternEuropeanCountries.includes(country.indicator)) {
        let pop = Number(country.population.replace(/,/g, ''))
        westernEuropePop += pop
    }
})

let easternEuropePop = 0
let realEasternEuropeanCountries = []
easternEuropeanCountries.forEach(country => { realEasternEuropeanCountries.push(country.name)})
pop.forEach(country => {
    if (realEasternEuropeanCountries.includes(country.indicator)) {
        let pop = Number(country.population.replace(/,/g, ''))
        easternEuropePop += pop
    }
})

let latinPop = 0
let realLatinCountries = []
latinAmericanCountries.forEach(country => { realLatinCountries.push(country.name)})
pop.forEach(country => {
    if (realLatinCountries.includes(country.indicator)) {
        let pop = Number(country.population.replace(/,/g, ''))
        latinPop += pop
    }
})

// bottom row
let eastAsiaPop = 0
let realEastAsianCountries = []
eastAsianCountries.forEach(country => { realEastAsianCountries.push(country.name)})
pop.forEach(country => {
    if (realEastAsianCountries.includes(country.indicator)) {
        let pop = Number(country.population.replace(/,/g, ''))
        eastAsiaPop += pop
    }
})

let menaPop = 0
let realMenaCountries = []
menaCountries.forEach(country => { realMenaCountries.push(country.name)})
pop.forEach(country => {
    if (realMenaCountries.includes(country.indicator)) {
        let pop = Number(country.population.replace(/,/g, ''))
        menaPop += pop
    }
})

let northAmericaPop = 0
let realNorthAmericanCountries = []
northAmericanCountries.forEach(country => { realNorthAmericanCountries.push(country.name)})
pop.forEach(country => {
    if (realNorthAmericanCountries.includes(country.indicator)) {
        let pop = Number(country.population.replace(/,/g, ''))
        northAmericaPop += pop
    }
})

let centralAsiaPop = 0
let realCentralAsianCountries = []
centralAsianCountries.forEach(country => { realCentralAsianCountries.push(country.name)})
pop.forEach(country => {
    if (realCentralAsianCountries.includes(country.indicator)) {
        let pop = Number(country.population.replace(/,/g, ''))
        centralAsiaPop += pop
    }
})

let indianPop = 0
let realIndianCountries = []
indianSubcontinentCountries.forEach(country => { realIndianCountries.push(country.name)})
pop.forEach(country => {
    if (realIndianCountries.includes(country.indicator)) {
        let pop = Number(country.population.replace(/,/g, ''))
        indianPop += pop
    }
})

// global north vs global south
document.querySelector('.north-percentage').innerHTML = `Percent of Global Weath <span>${globalNorthTotalPercentage.toString().slice(0, 4)}%</span>`
document.querySelector('.north-population').innerHTML = `Percent of Worlds Population <span>${((globalNorthPop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`

document.querySelector('.south-percentage').innerHTML = `Percent of Global Weath <span>${globalSouthTotalPercentage.toString().slice(0, 4)}%</span>`
document.querySelector('.south-population').innerHTML = `Percent of Worlds Population <span>${((globalSouthPop / totalPopulation) * 100 + 1).toString().slice(0, 4)}%</span>`

// top row
document.querySelector('.pacific-percentage').innerHTML = `Percent of Global Weath <span>${continentTotals[9].percentage.toString().slice(0, 4)}%</span>`
document.querySelector('.africa-percentage').innerHTML = `Percent of Global Weath <span>${continentTotals[0].percentage.toString().slice(0, 4)}%</span>`
document.querySelector('.western-europe-percentage').innerHTML = `Percent of Global Weath <span>${continentTotals[6].percentage.toString().slice(0, 4)}%</span>`
document.querySelector('.eastern-europe-percentage').innerHTML = `Percent of Global Weath <span>${continentTotals[5].percentage.toString().slice(0, 4)}%</span>`
document.querySelector('.latin-percentage').innerHTML = `Percent of Global Weath <span>${continentTotals[8].percentage.toString().slice(0, 4)}%</span>`

document.querySelector('.pacific-population').innerHTML = `Percent of Worlds Population <span>${((pacificPop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`
document.querySelector('.africa-population').innerHTML = `Percent of Worlds Population <span>${((africaPop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`
document.querySelector('.western-europe-population').innerHTML = `Percent of Worlds Population <span>${((westernEuropePop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`
document.querySelector('.eastern-europe-population').innerHTML = `Percent of Worlds Population <span>${((easternEuropePop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`
document.querySelector('.latin-population').innerHTML = `Percent of Worlds Population <span>${((latinPop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`

console.log('continentTotals: ', continentTotals)
// bottom row 
document.querySelector('.east-asia-percentage').innerHTML = `Percent of Global Weath <span>${continentTotals[1].percentage.toString().slice(0, 4)}%</span>`
document.querySelector('.mena-percentage').innerHTML = `Percent of Global Weath <span>${continentTotals[4].percentage.toString().slice(0, 4)}%</span>`
document.querySelector('.north-america-percentage').innerHTML = `Percent of Global Weath <span>${continentTotals[7].percentage.toString().slice(0, 4)}%</span>`
document.querySelector('.central-asia-percentage').innerHTML = `Percent of Global Weath <span>${continentTotals[3].percentage.toString().slice(0, 4)}%</span>`
document.querySelector('.indian-percentage').innerHTML = `Percent of Global Weath <span>${continentTotals[2].percentage.toString().slice(0, 4)}%</span>`

document.querySelector('.east-asia-population').innerHTML = `Percent of Worlds Population <span>${((eastAsiaPop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`
document.querySelector('.mena-population').innerHTML = `Percent of Worlds Population <span>${((menaPop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`
document.querySelector('.north-america-population').innerHTML = `Percent of Worlds Population <span>${((northAmericaPop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`
document.querySelector('.central-asia-population').innerHTML = `Percent of Worlds Population <span>${((centralAsiaPop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`
document.querySelector('.indian-population').innerHTML = `Percent of Worlds Population <span>${((indianPop / totalPopulation) * 100 + 1).toString().slice(0, 4) + 1}%</span>`

})
})
}


document.querySelector('.country-select').onchange = loadBubbles

let percentileData = [
    {
        name: 'Top 1%',
        percentage: 45,
        position: 'Top',
        row: '1',
        realWealth: 360474 * .45,
        wealth: `$${360474 * .45} Billion`,
        population: 1,
        rawPop: '78 Million People',
        raw: 78
    },
    {
        name: 'Bottom 99%',
        percentage: 55,
        position: 'Bottom',
        row: '1',
        realWealth: 360474 * .55,
        wealth: `$${360474 * .55} Billion`,
        population: 99,
        rawPop: '7720 Million People',
        raw: 7720
    },
    {
        name: 'Top 5%',
        percentage: 70,
        position: 'Top',
        row: '2',
        realWealth: 360474 * .70,
        wealth: `$${360474 * .70} Billion`,
        population: 5,
        rawPop: '390 Million People',
        raw: 390
    },
    {
        name: 'Bottom 95%',
        percentage: 30,
        position: 'Bottom',
        row: '2',
        realWealth: 360474 * .30,
        wealth: `$${360474 * .30} Billion`,
        population: 95,
        rawPop: '7410 Million People',
        raw: 7410
    },
    {
        name: 'Top 10%',
        percentage: 82,
        position: 'Top',
        row: '3',
        realWealth: 360474 * .82,
        wealth: `$${360474 * .82} Billion`,
        population: 10,
        rawPop: '780 Million People',
        raw: 780
    },
    {
        name: 'Bottom 90%',
        percentage: 18,
        position: 'Bottom',
        row: '3',
        realWealth: 360474 * .18,
        wealth: `$${360474 * .18} Billion`,
        population: 90,
        rawPop: '7020 Million People',
        raw: 7020
    },
]


function loadSecondChart() {

    let width,
    height

    if (isLaptop) {
        width = 2000
        height = 700
    } else {
        width = 2000
        height = 700
    }

    let radius
    if (isLaptop) {
        radius = d3.scaleSqrt().domain([1, 105990]).range([2, 110])
        popRadius = d3.scaleSqrt().domain([1, 780]).range([-20, 75])
    } else {
        radius = d3.scaleSqrt().domain([1, 105990]).range([1, 120])
        popRadius = d3.scaleSqrt().domain([1, 780]).range([-20, 75])
    }

    const tip = d3.tip()
    .attr('class', 'first-d3-tip')
    .offset([-10, 0])
    .html(function(d) {
            return `
            <div class="scatterplot-tooltip">
                <h1>${d.name}</h1>
                <h3>Wealth: <span>${d.wealth}</span></h1>
                <h3>Percent of World's Population: <span>${d.population}%</span></h1>
                <h3>Percent of World's Wealth: <span>${d.percentage}%</span></h1>
            </div>
            `
    })

    const svg = d3.select('#second-chart')
        .append("svg")
        .attr('height', height)
        .attr('width', width)
        .append("g")
        .attr("transform", `translate(0,0)`)

    const svgPop = d3.select('#population-chart')
        .append("svg")
        .attr('height', height)
        .attr('width', width)
        .append("g")
        .attr("transform", `translate(0,0)`)

    svg.call(tip);
    svgPop.call(tip);

    let circlesPop = svg.selectAll('.popDot')
        .data(percentileData.slice(0, 2))
        .enter().append("circle")
        .attr('class', 'popDot')
        .attr("r", function(d) {
            return popRadius(d.raw)
        })
        .attr("fill", function(d) {
            if (d.position == 'Top') {
                return '#CACAE3'
            }  else {
                return '#F8A163'        
            }
        })
        .attr("stroke", function(d) {
            if (d.position == 'Top') {
                return '#BCBCDC'
            }  else {
                return '#F79550'        
            }
        })
        .attr('stroke-width', '3px')
        .attr('cx', function(d) {
            if (isLaptop) {
                if (d.position == 'Top') {
                    return 800
                } else {
                    return 1150
                }
            } else {
                if (d.position == 'Top') {
                    return 1150
                } else {
                    return 1550
                }
            }
        })
        .attr('cy', function(d) {
            if (d.row == '1') {
                return 325
            } else if (d.row == '2') {
                return 1800
            } else {
                return 2000
            }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

        let circles = svg.selectAll('.secondDot')
        .data(percentileData.slice(0, 2))
        .enter().append("circle")
        .attr('class', 'secondDot')
        .attr("r", function(d) {
            return radius(d.realWealth)
        })
        .attr("fill", function(d) {
            if (d.position == 'Top') {
                return '#CACAE3'
            }  else {
                return '#F8A163'        
            }
        })
        .attr("stroke", function(d) {
            if (d.position == 'Top') {
                return '#BCBCDC'
            }  else {
                return '#F79550'        
            }
        })
        .attr('stroke-width', '3px')
        .attr('cx', function(d) {
            if (isLaptop) {
                if (d.position == 'Top') {
                    return 225
                } else {
                    return 550
                }
            } else {
                if (d.position == 'Top') {
                    return 300
                } else {
                    return 750
                }
            }
        })
        .attr('cy', function(d) {
            if (d.row == '1') {
                return 350
            } else if (d.row == '2') {
                return 1100
            } else {
                return 2000
            }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
}

function loadThirdChart() {
    let width,
    height
    if (isLaptop) {
        width = 1500
        height = 700
    } else {
        width = 2000
        height = 700
    }

    let radius,
    popRadius
    if (isLaptop) {
        radius = d3.scaleSqrt().domain([1, 105990]).range([2, 110])
        popRadius = d3.scaleSqrt().domain([1, 780]).range([-30, 75])
    } else {
        radius = d3.scaleSqrt().domain([1, 105990]).range([1, 120])
        popRadius = d3.scaleSqrt().domain([1, 780]).range([-30, 75])
    }

    const tip = d3.tip()
    .attr('class', 'first-d3-tip')
    .offset([-10, 0])
    .html(function(d) {
            return `
            <div class="scatterplot-tooltip">
                <h1>${d.name}</h1>
                <h3>Wealth: <span>${d.wealth}</span></h1>
                <h3>Percent of World's Population: <span>${d.population}%</span></h1>
                <h3>Percent of World's Wealth: <span>${d.percentage}%</span></h1>
            </div>
            `
    })

    const svg = d3.select('#third-chart')
        .append("svg")
        .attr('height', height)
        .attr('width', width)
        .append("g")
        .attr("transform", `translate(0,0)`)

    const svgPop = d3.select('#second-population-chart')
        .append("svg")
        .attr('height', height)
        .attr('width', width)
        .append("g")
        .attr("transform", `translate(0,0)`)

    svg.call(tip);
    svgPop.call(tip);

    let circlesPop = svg.selectAll('.popDot')
        .data(percentileData.slice(2, 4))
        .enter().append("circle")
        .attr('class', 'popDot')
        .attr("r", function(d) {
            return popRadius(d.raw)
        })
        .attr("fill", function(d) {
            if (d.position == 'Top') {
                return '#CACAE3'
            }  else {
                return '#F8A163'        
            }
        })
        .attr("stroke", function(d) {
            if (d.position == 'Top') {
                return '#BCBCDC'
            }  else {
                return '#F79550'        
            }
        })
        .attr('stroke-width', '3px')
        .attr('cx', function(d) {
            if (isLaptop) {
                if (d.position == 'Top') {
                    return 825
                } else {
                    return 1200
                }
            } else {
                if (d.position == 'Top') {
                    return 1100
                } else {
                    return 1550
                }
            }
        })
        .attr('cy', function(d) {
            if (d.row == '1') {
                return 325
            } else if (d.row == '2') {
                return 325
            } else {
                return 325
            }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

        let circles = svg.selectAll('.secondDot')
        .data(percentileData.slice(2, 4))
        .enter().append("circle")
        .attr('class', 'secondDot')
        .attr("r", function(d) {
            return radius(d.realWealth)
        })
        .attr("fill", function(d) {
            if (d.position == 'Top') {
                return '#CACAE3'
            }  else {
                return '#F8A163'        
            }
        })
        .attr("stroke", function(d) {
            if (d.position == 'Top') {
                return '#BCBCDC'
            }  else {
                return '#F79550'        
            }
        })
        .attr('stroke-width', '3px')
        .attr('cx', function(d) {
            if (isLaptop) {
                if (d.position == 'Top') {
                    return 250
                } else {
                    return 575
                }
            } else {
                if (d.position == 'Top') {
                    return 300
                } else {
                    return 750
                }
            }
        })
        .attr('cy', function(d) {
            if (d.row == '1') {
                return 350
            } else if (d.row == '2') {
                return 325
            } else {
                return 325
            }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
}

function loadFourthChart() {
    let width,
    height
    if (isLaptop) {
        width = 1500
        height = 700
    } else {
        width = 2000
        height = 700
    }

    let radius,
    popRadius
    if (isLaptop) {
        popRadius = d3.scaleSqrt().domain([1, 780]).range([-30, 75])
        radius = d3.scaleSqrt().domain([1, 105990]).range([2, 110])
    } else {
        radius = d3.scaleSqrt().domain([1, 105990]).range([1, 120])
        popRadius = d3.scaleSqrt().domain([1, 780]).range([-20, 75])
    }

    const tip = d3.tip()
    .attr('class', 'first-d3-tip')
    .offset([-10, 0])
    .html(function(d) {
            return `
            <div class="scatterplot-tooltip">
                <h1>${d.name}</h1>
                <h3>Wealth: <span>${d.wealth}</span></h1>
                <h3>Percent of World's Population: <span>${d.population}%</span></h1>
                <h3>Percent of World's Wealth: <span>${d.percentage}%</span></h1>
            </div>
            `
    })

    const svg = d3.select('#fourth-chart')
        .append("svg")
        .attr('height', height)
        .attr('width', width)
        .append("g")
        .attr("transform", `translate(0,0)`)

    const svgPop = d3.select('#third-population-chart')
        .append("svg")
        .attr('height', height)
        .attr('width', width)
        .append("g")
        .attr("transform", `translate(0,0)`)

    svg.call(tip);
    svgPop.call(tip);

    let circlesPop = svg.selectAll('.popDot')
        .data(percentileData.slice(4, 6))
        .enter().append("circle")
        .attr('class', 'popDot')
        .attr("r", function(d) {
            return popRadius(d.raw)
        })
        .attr("fill", function(d) {
            if (d.position == 'Top') {
                return '#CACAE3'
            }  else {
                return '#F8A163'        
            }
        })
        .attr("stroke", function(d) {
            if (d.position == 'Top') {
                return '#BCBCDC'
            }  else {
                return '#F79550'        
            }
        })
        .attr('stroke-width', '3px')
        .attr('cx', function(d) {
            if (isLaptop) {
                if (d.position == 'Top') {
                    return 800
                } else {
                    return 1200
                }
            }
            else {
                if (d.position == 'Top') {
                    return 1100
                } else {
                    return 1550
                }
            }
        })
        .attr('cy', function(d) {
            if (d.row == '1') {
                return 325
            } else if (d.row == '2') {
                return 325
            } else {
                return 325
            }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

        let circles = svg.selectAll('.secondDot')
        .data(percentileData.slice(4, 6))
        .enter().append("circle")
        .attr('class', 'secondDot')
        .attr("r", function(d) {
            return radius(d.realWealth)
        })
        .attr("fill", function(d) {
            if (d.position == 'Top') {
                return '#CACAE3'
            }  else {
                return '#F8A163'        
            }
        })
        .attr("stroke", function(d) {
            if (d.position == 'Top') {
                return '#BCBCDC'
            }  else {
                return '#F79550'        
            }
        })
        .attr('stroke-width', '3px')
        .attr('cx', function(d) {
            if (isLaptop) {
                if (d.position == 'Top') {
                    return 250
                } else {
                    return 550
                }
            }
            else {
                if (d.position == 'Top') {
                    return 300
                } else {
                    return 750
                }
            }
        })
        .attr('cy', function(d) {
            if (d.row == '1') {
                return 350
            } else if (d.row == '2') {
                return 325
            } else {
                return 325
            }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
}

window.onload = function() {
    loadBubbles();
    loadSecondChart();
    loadThirdChart();
    loadFourthChart();
};
