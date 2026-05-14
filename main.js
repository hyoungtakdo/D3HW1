// Set chart dimensions and margins
const width = 700;
const height = 500;

const margin = {
    top: 40,
    right: 30,
    bottom: 60,
    left: 60
};

// Select the SVG element
const svg = d3.select("svg");

// Load data from external CSV file
d3.csv("emails.csv").then(data => {

    // Convert email values to numbers
    data.forEach(d => {
        d.emails = +d.emails;
    });

    // Create x scale for days
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.day))
        .range([margin.left, width - margin.right])
        .padding(0.2);

    // Create y scale for email counts
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.emails)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    // Create bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.day))
        .attr("y", d => yScale(d.emails))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - margin.bottom - yScale(d.emails));

    // Create x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

    // Create y-axis
    svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale));

    // Add x-axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height - 15)
        .attr("text-anchor", "middle")
        .text("Day of the Week");

    // Add y-axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Number of Emails");
});