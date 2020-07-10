d3.csv("wealth.csv", function(error, data) {
    const countries = data;
    let totalWealth = 0;
    let asiaPacific = []
    let africa = []
    let europe = []
    let northAmerica = []
    let latinAmerica = []
    console.log('countries: ', countries)
    countries.forEach(country => {
        let countryWealth = country['Wealth ($B)'].slice(1,country['Wealth ($B)'].length).replace(/,/g, '')
        countryWealth = Number(countryWealth)
        if (country.Region == 'Africa') {
            africa.push(country)
        } else if (country.Region == 'Asia-Pacific' || country.Region == 'China' || country.Region == 'India') {
            asiaPacific.push(country)
        } else if (country.Region == 'Latin America') {
            latinAmerica.push(country)
        } else if (country.Region == 'Europe') {
            europe.push(country)
        } else {
            northAmerica.push(country)
        }
        totalWealth += countryWealth
    })
    
    // countries.forEach(country => {
    //    console.log('country: ', country)
    //    let test = country['Wealth ($B)'].slice(1,country['Wealth ($B)'].length).replace(/,/g, '')
    //    test = Number(test)
    // })

    console.log('asiaPacific: ', asiaPacific)
    console.log('africa: ', africa)
    console.log('europe: ', europe)
    console.log('northAmerica: ', northAmerica)
    console.log('latinAmerica: ', latinAmerica)
})