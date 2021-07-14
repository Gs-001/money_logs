function populate_dashboard(data) {
    populateAccountsSection(data)
    populateRecordsSection(data["cards"]["records"])
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