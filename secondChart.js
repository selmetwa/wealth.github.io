function loadSecondChart() {
    let testData = [
        {
            name: 'Top 1%',
            percentage: 45,
            position: 'Top',
            row: '1',
            wealth: `$${360474 * .45} Billion`,
            population: 1,
        },
        {
            name: 'Bottom 99%',
            percentage: 55,
            position: 'Bottom',
            row: '1',
            wealth: `$${360474 * .55} Billion`,
            population: 99
        },
        {
            name: 'Top 5%',
            percentage: 70,
            position: 'Top',
            row: '2',
            wealth: `$${360474 * .70} Billion`,
            population: 5
        },
        {
            name: 'Bottom 95%',
            percentage: 30,
            position: 'Bottom',
            row: '2',
            wealth: `$${360474 * .30} Billion`,
            population: 95
        },
        {
            name: 'Top 10%',
            percentage: 82,
            position: 'Top',
            row: '2',
            wealth: `$${360474 * .82} Billion`,
            population: 10
        },
        {
            name: 'Bottom 90%',
            percentage: 18,
            position: 'Bottom',
            row: '2',
            wealth: `$${360474 * .18} Billion`,
            population: 90
        },
    ]
    /* 
    onePercent,top,"$45"
    ninetyNinePercent,bottom,"$55"
    fivePercent,top,"$70"
    ninetyFivePercent,bottom,"$30"
    tenPercent,top,"$82"
    ninetyPercent,bottom,"$18"
    */
    let width,
    height

    if (isLaptop) {
        width = 1500
        height = 1300
    } else {
        width = 2000
        height = 2000
    }

    const svg = d3.select('#second-chart')
        .append("svg")
        .attr('height', height)
        .attr('width', width)
        .append("g")
        .attr("transform", `translate(0,0)`)

    let circles = svg.selectAll('.secondDot')
        .data(testData)
        .enter().append("circle")
        .attr('class', 'secondDot')
        .attr("r", 120)
        .attr("fill", '#CACAE3')
        .attr("stroke", '#BCBCDC')
        .attr('stroke-width', '3px')
        .attr('cx', function(d) {
            if (d.position == 'Top') {
                return 200
            } else {
                return 600
            }
        })
        .attr('cy', function(d) {
            if (d.row == '1') {
                return 200
            } else if (d.row == '2') {
                return 600
            } else {
                return 1200
            }
        })
}