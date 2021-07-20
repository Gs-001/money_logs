var apiResponse
fetch("https://cb183d86-76a6-43d7-aed2-fb3e2e490742.mock.pstmn.io/stats")
    .then((response) => { return response.json() })
    .then(function (data) {
        apiResponse = data
        populateStats(data["cards"])
        return data
    })
    .catch((err) => { console.log("ERROR: ", err)})

function populateStats(data) {
    container = document.getElementById("cards-container")
    data.forEach(element => {
        childDiv = document.createElement("div")
        childDiv.setAttribute("style", "height: 500px; width: 500px; margin: 80px")

        h4 = document.createElement("h4")
        h4.innerHTML = element.title

        p = document.createElement("p")
        p.innerHTML = element.description

        canvas = document.createElement("canvas")
        createPieChart(element, canvas)

        childDiv.appendChild(h4)
        childDiv.append(p)
        childDiv.appendChild(canvas)

        container.appendChild(childDiv)
    });
}


function createPieChart(data, ctx) {
    var legend = []
    var dataPoints = []
    data.content.forEach(element => legend.push(element.title))
    data.content.forEach(element => dataPoints.push(element.sum))

    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: legend,
        datasets: [
          {
            label: "Expense Overvview",
            data: dataPoints,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1
          }
        ]
      }
    });


}
