$("#phraseButton").click(randomPhrase)

function randomPhrase() {
  $.get("http://localhost:3000/frases", changePhrase)
}

function changePhrase(data) {
  let phrase = $(".phrase")
  let randomNumber = Math.floor(Math.random() * data.length)
  phrase.text(data[randomNumber].texto)
  updatePhraseLength()
  updateStartTime(data[randomNumber].tempo)
}