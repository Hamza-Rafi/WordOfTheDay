var getWord = function(url){
    fetch(url).then(response => response.json()).then(data => {
        let wordData = {
            word : data.word,
            definition : data.definitions[0].text
        }
        localStorage.setItem('wordData', JSON.stringify(wordData))
    })
}
var setDate = function(){
    let [day, month, year] = new Date().toLocaleDateString("en-GB").split('/')

    let dateNow = {
        day : day,
        month : month,
        year : year
    }
    // dateNow.day = day
    // dateNow.month = month
    // dateNow.year = year

    localStorage.setItem('date', JSON.stringify(dateNow))
}
var setWord = function(){
    let url = "http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=6wo4tpoh046qy4ktxok0xxt74i1ka00iwpr7uws0is0xaj0bp"
    getWord(url)
}
// Checks if the days are the same
var isSameDay = function(){
    var lastDate = JSON.parse(localStorage.getItem('date'))

    // Check if date is  in localStorage and if not sets it
    if (lastDate == null){
        setDate()
    }

    var currentDate = new Date().toLocaleDateString("en-GB").split('/')
    var currentDateObj = {
        day : currentDate[0],
        month : currentDate[1],
        year : currentDate[2]
    }

    if(lastDate.day == currentDateObj.day && lastDate.month == currentDateObj.month && lastDate.year == currentDateObj.year){
        return true
    }else{
        return false
    }
}
// var randomUrl = "http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=6wo4tpoh046qy4ktxok0xxt74i1ka00iwpr7uws0is0xaj0bp"
//
// var wordData = getRandomWord(randomUrl)
//

if(isSameDay()){
    // is its the same day then get word data from local storage
    var word = JSON.parse(localStorage.getItem('wordData'))
}else{
    // if it is noo the same day then get a new word and set it to local storage then reset date
    setWord()
    setDate()
    var word = JSON.parse(localStorage.getItem('wordData'))
}

console.log(word)
var wordHolder = document.getElementById('word');
var definitionHolder = document.getElementById('definition')

var wordContent = document.createTextNode(word.word)
wordHolder.appendChild(wordContent)

var definitionContent = document.createTextNode(word.definition)
definitionHolder.appendChild(definitionContent)

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
