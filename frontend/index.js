function populate_dashboard(data) {
    populateAccountsSection(data)
    populateRecordsSection(data["cards"]["records"])
    populateStatsSection(data["cards"]["stats"])
}

function populateRecordsSection(data) {
    recordsList = document.getElementById("records-list")
    for (let i=0 ; i<data["content"].length ; i++) {
        var record = data["content"][i]
        var li = document.createElement("li")
        var div = document.createElement("div")
        var p = document.createElement("p")
        var textNode = document.createTextNode(record.title + " | " + record.date + " | " + record.sum)
        p.appendChild(textNode)
        div.appendChild(p)
        li.appendChild(div)

        recordsList.appendChild(li)
    }
}

function populateAccountsSection(data) {
    accountsSection = document.getElementById("accounts-list")
    accountsList = data["accounts"]
    console.log(accountsList.length)
    for(let i=0 ; i<accountsList.length ; i++) {
        const element = document.createElement('li')
        var textnode = document.createTextNode(accountsList[i].title)
        element.appendChild(textnode)
        accountsSection.appendChild(element)
    }
}


fetch('https://cb183d86-76a6-43d7-aed2-fb3e2e490742.mock.pstmn.io/dashboard')
    .then(function (response){
        return response.json()
    })
    .then(function (data) {
        // console.log(data)
        populate_dashboard(data)
    }).catch(function (err) {
        console.log("something went wrong!: ", err)
    })

function populateStatsSection(data) {
    var ctx = document.getElementById("myChart");
    ctx.style.width = 100;
    ctx.style.height = 100;
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
