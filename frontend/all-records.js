function populate_records(data) {
    data.records.forEach(function(element) {
        ul = document.getElementById("records-list")
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

fetch("https://cb183d86-76a6-43d7-aed2-fb3e2e490742.mock.pstmn.io/records")
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        console.log(data)
        populate_records(data)
    })
    .catch(function (err){
        alert("something went wrong", err)
    })