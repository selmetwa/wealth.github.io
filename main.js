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
d3.csv("wealth.csv", function(error, data) {
    const countries = data;
    let realCountries = []
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
        if (africa.includes(country.name)) {
            africanCountries.push(country)
        } else if (mena.includes(country.name)) {
            menaCountries.push(country)
        } else if (eastAsia.includes(country.name)) {
            eastAsianCountries.push(country)
        } else if (easternEurope.includes(country.name)) {
            easternEuropeanCountries.push(country)
        } else if (westernEurope.includes(country.name)) {
            westernEuropeanCountries.push(country)
        } else if (india.includes(country.name)) {
            indianSubcontinentCountries.push(country)
        } else if (centralAsia.includes(country.name)) {
            centralAsianCountries.push(country)
        } else if (southEastAsia.includes(country.name)) {
            southEastAsianCountries.push(country)
        } else if (oceania.includes(country.name)) {
            oceaniaCountries.push(country)
        } else if (country.region == 'North America') {
            northAmericanCountries.push(country)
        } else if (country.region == 'Latin America') {
            latinAmericanCountries.push(country)
        } else {
            leftover.push(country)
        }
        totalWealth += countryWealth
    })
    console.log('realCountries: ', realCountries)

  
    // let africanCountries = []
    // let menaCountries = []
    // let easternEuropeanCountries = []
    // let westernEuropeanCountries = []
    // let eastAsianCountries = []
    // let centralAsianCountries = []
    // let southEastAsianCountries = []
    // let indianSubcontinentCountries = []
    // let northAmericanCountries = []
    // let latinAmericanCountries = []
    // let oceaniaCountries = []
    // let leftover = []

    console.log('africanCountries: ', africanCountries)
    console.log('menaCountries: ', menaCountries)
    console.log('easternEuropeanCountries: ', easternEuropeanCountries)
    console.log('westernEuropeanCountries: ', westernEuropeanCountries)
    console.log('easternEuropeanCountries: ', easternEuropeanCountries)
    console.log('eastAsianCountries: ', eastAsianCountries)
    console.log('southEastAsianCountries: ', southEastAsianCountries)
    console.log('indianSubcontinentCountries: ', indianSubcontinentCountries)
    console.log('northAmericanCountries: ', northAmericanCountries)
    console.log('latinAmericanCountries: ', latinAmericanCountries)
    console.log('oceaniaCountries: ', oceaniaCountries)
    console.log('leftover: ', leftover)

})






// let africaTotal = 0
// africa.forEach(country => {
//     africaTotal += country.wealth
// })
// africa.push({
//     name: 'Africa Total',
//     region: 'Africa',
//     total: africaTotal,
//     percentage: africaTotal / totalWealth * 100
// })

// continentTotals.push({
//     name: 'Africa',
//     total: africaTotal,
//     percentage: africaTotal / totalWealth * 100
// })

// let asiaPacificTotal = 0
// asiaPacific.forEach(country => {
//     asiaPacificTotal += country.wealth
// })
// asiaPacific.push({
//     name: 'Asia-Pacific Total',
//     region: 'Asia-Pacific',
//     total: asiaPacificTotal,
//     percentage: asiaPacificTotal / totalWealth * 100
// })
// continentTotals.push({
//     name: 'Asia-Pacific',
//     total: asiaPacificTotal,
//     percentage: asiaPacificTotal / totalWealth * 100
// })

// let europeTotal = 0
// europe.forEach(country => {
//     europeTotal += country.wealth
// })
// europe.push({
//     name: 'Europe Total',
//     region: 'Europe',
//     total: europeTotal,
//     percentage: europeTotal / totalWealth * 100
// })
// continentTotals.push({
//     name: 'Europe',
//     total: europeTotal,
//     percentage: europeTotal / totalWealth * 100
// })

// let northAmericaTotal = 0
// northAmerica.forEach(country => {
//     northAmericaTotal += country.wealth
// })
// northAmerica.push({
//     name: 'North America Total',
//     region: 'North America',
//     total: northAmericaTotal,
//     percentage: northAmericaTotal / totalWealth * 100
// })
// continentTotals.push({
//     name: 'North America',
//     total: northAmericaTotal,
//     percentage: northAmericaTotal / totalWealth * 100
// })

// let latinAmericaTotal = 0
// latinAmerica.forEach(country => {
//     latinAmericaTotal += country.wealth
// })
// latinAmerica.push({
//     name: 'Latin America Total',
//     region: 'Latin America',
//     total: latinAmericaTotal,
//     percentage: latinAmericaTotal / totalWealth * 100
// })

// continentTotals.push({
//     name: 'Latin America',
//     total: latinAmericaTotal,
//     percentage: latinAmericaTotal / totalWealth * 100
// })