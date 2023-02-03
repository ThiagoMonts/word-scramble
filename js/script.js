const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".hint time"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word")

let correctWord, timer

const initTimer = maxTime => {
    clearInterval(timer)
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--
            return timeText.innerText = maxTime
        }
        clearInterval(timer)
        alert(`Time off! ${correctWord.toUpperCase} was a correct word`)
        initGame()
    }, 1000)
}

const initGame = () => {
    initTimer(30)
    let randomObj = words[Math.floor(Math.random() * words.length)] // getting random object from words
    let wordArray = randomObj.word.split("") // splitting each letter of random word
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)) // getting a random number
        //shuffling and swiping wordArray letters randomly
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]]
        
    }
    wordText.innerText = wordArray.join("") // passing shuffled word as word text
    hintText.innerText = randomObj.hint //passing random object hint as hint text
    correctWord = randomObj.word.toLocaleLowerCase() // passing random word to correctWord
    inputField.value = ""
    inputField.setAttribute("maxlength", correctWord.length)
}

initGame()

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase() // getting user value
    if (!userWord) return alert("Please enter a word check")
    if (userWord !== correctWord) return alert(`Ops! ${userWord} is not a correct word`)
    alert(`Congrats! ${userWord.toUpperCase} is a correct word`)
    initGame()
}

refreshBtn.addEventListener("click", initGame)
checkBtn.addEventListener("click", checkWord)