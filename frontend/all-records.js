var apiResponse

document.getElementsByName("instant-filter").forEach(function (radio) {
    radio.addEventListener('click', (event) => { populateRecords(apiResponse, event.target.value) })
})

fetch("https://cb183d86-76a6-43d7-aed2-fb3e2e490742.mock.pstmn.io/records")
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        apiResponse = data
        console.log(data)
        populateRecords(data)
    })
    .catch(function (err){
        console.log("something went wrong", err)
    })

function getDatePastDays(days) {
    return dayjs().subtract(days, "d")
}

function getDatePastMonths(months) {
    return dayjs().subtract(months, "M")
}

function getDatePastYears(years) {
    return dayjs().subtract(years, "y")
}

function applyInstantFilters(data, index="30D") {
    switch(index) {
        case "7D:": 
            return instantFilters(data, getDatePastDays(7))
            break
        case "30D": 
        console.log("30 D: ", getDatePastDays(30))
            return instantFilters(data, getDatePastDays(30))
            break;
        case "6M":
            return instantFilters(data, getDatePastMonths(6))
            break;
        case "1Y":
            return instantFilters(data, getDatePastYears(3))
            break;
        case "*":
            return instantFilters(data, dayjs(0))
            break;
    }
}

function instantFilters(data, fromDate, toDate = dayjs()) {
    filteredData = []
    console.log("fromdate: ", fromDate)
    console.log("todate: ", toDate)
    data.forEach(function parseDate(element) {
        console.log(element.date)
        if(dayjs(element.date) >= fromDate && dayjs(element.date) <= toDate)
            filteredData.push(element)
    })

    return filteredData
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function populateRecords(data, index) {
    data = applyInstantFilters(data.records, index)
    console.log(data)
    ul = document.getElementById("records-list")
    removeAllChildNodes(ul)
    data.forEach(function(element) {
        var li = document.createElement("li")
        var h4 = document.createElement("h4")
        var p1 = document.createElement("p")
        var p2 = document.createElement("p")

        h4.innerHTML = element.category
        p1.innerHTML = element.account_title + "<br>" + element.title + "<br>" + element.labels
        p2.innerHTML = element.amount + "<br>" + element.date

        li.appendChild(h4)
        li.appendChild(p1)
        li.appendChild(p2)
        ul.appendChild(li)
        console.log(element.title)
        
    })
}