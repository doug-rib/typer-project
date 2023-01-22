const startTime = $("#typingTime").text()
let field = $(".typingField")

// Essa funcão significa que após a página carregar o html irá rodar o que estiver aqui
$(() => {
  updatePhraseLength();
  initializeCounters();
  initializeStopwatch();
  initializeBorder()
  $("#reloadButton").click(reloadGame)
})

const updatePhraseLength = () => {
  let phrase = $(".phrase").text();
  let numberOfWords = phrase.split(" ").length;
  let lenPhrase = $("#phraseLength")
  lenPhrase.text(numberOfWords)
  
}

const initializeCounters = () => {
  field.on("input", () => {
    let content = field.val()
    let wordQuantity = content.split(/\S+/).length - 1
    $("#charCounter").text(content.length)
    $("#wordCounter").text(wordQuantity)
  })
}

const initializeStopwatch = () => {
  $("#reloadButton").attr("disabled", true)
  let timeLeft = $("#typingTime").text()
  field.one("focus", () => {
    let id = setInterval(() => {
      timeLeft--
      $("#typingTime").text(timeLeft)

      if (timeLeft < 1) {
        clearInterval(id)
        endGame();
      }
    }, 1000)
  })
}

const endGame = () => {
  field.attr("disabled", true)
  $("#reloadButton").attr("disabled", false)
  field.toggleClass("disabledField")
  scoreboardInsert();
}

const reloadGame = () => {
  field.attr("disabled", false)
  field.val("")
  $("#charCounter").text("0")
  $("#wordCounter").text("0")
  $("#typingTime").text(startTime)
  field.toggleClass("disabledField")
  initializeStopwatch()
  field.removeClass("greenBorder")
  field.removeClass("redBorder")
}

const initializeBorder = () => {
  let phrase = $(".phrase").text()
  field.on("input", () => {
  let compare = phrase.slice(0, field.val().length)
  let typed = field.val()

  if (typed === compare) {
    field.addClass("greenBorder")
    field.removeClass("redBorder")
  } else {
    field.removeClass("greenBorder")
    field.addClass("redBorder")
  }
  })
}









