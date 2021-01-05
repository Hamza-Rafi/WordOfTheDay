// if(confirm('reset localStorage?')){
//     localStorage.clear()
// }else{}

var getWord = function(){
    let url = "http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=6wo4tpoh046qy4ktxok0xxt74i1ka00iwpr7uws0is0xaj0bp"

    fetch(url).then(response => response.json()).then(data => {
        let wordData = {
            word : data.word,
            definition : data.definitions[0].text
        }
        localStorage.setItem('wordData', JSON.stringify(wordData))
        console.log("API req made")
        // listLocalStorage()
    })
}
var setDate = function(){
    let [date, month, year] = new Date().toLocaleDateString("en-GB").split('/')

    let dateNow = {
        date : date,
        month : month,
        year : year
    }
    // dateNow.day = day
    // dateNow.month = month
    // dateNow.year = year

    localStorage.setItem('date', JSON.stringify(dateNow))
    // listLocalStorage()
}
// Checks if the days are the same
var isSameDay = function(){
    var lastDate = JSON.parse(localStorage.getItem('date'))

    // Check if date is  in localStorage and if not sets it
    if (lastDate == null){
        setDate()
        lastDate = JSON.parse(localStorage.getItem('date'))
    }

    var currentDate = new Date().toLocaleDateString("en-GB").split('/')
    var currentDateObj = {
        date : currentDate[0],
        month : currentDate[1],
        year : currentDate[2]
    }

    if(lastDate.date == currentDateObj.date && lastDate.month == currentDateObj.month && lastDate.year == currentDateObj.year){
        return true
    }else{
        return false
    }
}

var lastDate = JSON.parse(localStorage.getItem('date'))

if(lastDate == null){
    setDate()
    getWord()
    lastDate = JSON.parse(localStorage.getItem('date'))
    console.log('Lastdate is null')
}

var sameDay = isSameDay()
// sameDay = false

if(sameDay == false){
    console.log("sameday is false")
    setDate()
    getWord()
}
setTimeout(() => {
    var word = JSON.parse(localStorage.getItem("wordData"))

    var wordHolder = document.getElementById('word');
    var wordContent = document.createTextNode(word.word)
    wordHolder.appendChild(wordContent)

    var definitionHolder = document.getElementById('definition')
    var definitionContent = document.createTextNode(word.definition)
    definitionHolder.appendChild(definitionContent)

}, 250)


// Date and time for display
var updateTime = function(){
    var timeContainer = document.getElementById('timeContainer')
    var displayDate = new Date().toLocaleString("en-GB")

    while(timeContainer.firstChild){
        timeContainer.firstChild.remove()
    }

    var timeContent = document.createTextNode(displayDate)
    timeContainer.appendChild(timeContent)
}
setInterval(updateTime, 500)





// getWord("http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=6wo4tpoh046qy4ktxok0xxt74i1ka00iwpr7uws0is0xaj0bp")


// var listLocalStorage = function(){
//     if(localStorage.length == 0){
//         return
//     }
//     for(var i = 0; i < localStorage.length; i++){
//         console.log(localStorage.key(i))
//     }
// }
// // var randomUrl = "http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=6wo4tpoh046qy4ktxok0xxt74i1ka00iwpr7uws0is0xaj0bp"
// //
// // var wordData = getRandomWord(randomUrl)
// //
//
// if(isSameDay()){
//     // is its the same day then get word data from local storage
//     var word = JSON.parse(localStorage.getItem('wordData'))
//     if(word == null){
//         getWord("http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=6wo4tpoh046qy4ktxok0xxt74i1ka00iwpr7uws0is0xaj0bp")
//
//         word = JSON.parse(localStorage.getItem('wordData'))
//         console.log(word)
//     }
// }else{
//     // if it is not the same day then get a new word and set it to local storage then reset date
//     getWord("http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=6wo4tpoh046qy4ktxok0xxt74i1ka00iwpr7uws0is0xaj0bp")
//     setDate()
//     var word = JSON.parse(localStorage.getItem('wordData'))
// }
// var wordHolder = document.getElementById('word');
// var definitionHolder = document.getElementById('definition')
//
// var wordContent = document.createTextNode(word.word)
// wordHolder.appendChild(wordContent)
//
// var definitionContent = document.createTextNode(word.definition)
// definitionHolder.appendChild(definitionContent)
//
// // Date and time for display
// var updateTime = function(){
//     var timeContainer = document.getElementById('timeContainer')
//     var displayDate = new Date().toLocaleString("en-GB")
//
//     while(timeContainer.firstChild){
//         timeContainer.firstChild.remove()
//     }
//
//     var timeContent = document.createTextNode(displayDate)
//     timeContainer.appendChild(timeContent)
// }
// setInterval(updateTime, 500)
