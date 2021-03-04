// if(confirm('reset localStorage?')){
//     localStorage.clear()
// }else{}

// I need help ;-;
var getWord = function() {
    let url = "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=6wo4tpoh046qy4ktxok0xxt74i1ka00iwpr7uws0is0xaj0bp"

    fetch(url).then(response => response.json()).then(data => {
        let wordData = {
            word: data.word,
            definition: data.definitions[0].text
        }
        localStorage.setItem('wordData', JSON.stringify(wordData))
        console.log("API req made")

        displayWord()
    })
} 
var setDate = function() {
        let [date, month, year] = new Date().toLocaleDateString("en-GB").split('/')

        let dateNow = {
                date: date,
                month: month,
                year: year
            }

        localStorage.setItem('date', JSON.stringify(dateNow))

    }
    // Checks if the days are the same
var isSameDay = function() {
    var lastDate = JSON.parse(localStorage.getItem('date'))

    // Check if date is  in localStorage and if not sets it
    if (lastDate == null) {
        setDate()
        lastDate = JSON.parse(localStorage.getItem('date'))
    }

    var currentDate = new Date().toLocaleDateString("en-GB").split('/')
    var currentDateObj = {
        date: currentDate[0],
        month: currentDate[1],
        year: currentDate[2]
    }

    if (lastDate.date == currentDateObj.date && lastDate.month == currentDateObj.month && lastDate.year == currentDateObj.year) {
        return true
    } else {
        return false
    }
}
var displayWord = function(){
    var word = JSON.parse(localStorage.getItem("wordData"))

    var wordHolder = document.getElementById('word');
    var wordContent = document.createTextNode(word.word)
    wordHolder.appendChild(wordContent)

    var definitionHolder = document.getElementById('definition')
    var definitionContent = document.createTextNode(word.definition)

    definitionHolder.appendChild(definitionContent)
    console.log('Word displayed')
}

var lastDate = JSON.parse(localStorage.getItem('date'))

if (lastDate == null) {
    setDate()
    getWord()
    lastDate = JSON.parse(localStorage.getItem('date'))
    console.log('Lastdate is null')
}else{
    var sameDay = isSameDay()
        // sameDay = false
    
    if (sameDay == false) {
        console.log("sameday is false")
        setDate()
        getWord()
    }else if(sameDay == true){
        displayWord()
    }

}