let startTime = $("#typingTime").text()
let field = $(".typingField")

// Essa funcão significa que após a página carregar o html irá rodar o que estiver aqui
$(function(){
  updatePhraseLength();
  initializeCounters();
  initializeStopwatch();
  initializeBorder()
  $("#reloadButton").click(reloadGame)
  
  updateScoreboard()

  $('#users').selectize({
    create: true,
    sortField: {
      field: 'text',
      direction: 'asc'
    }
  });

  $('.tooltip').tooltipster({
    animation: 'fade',
    delay: 200,
    theme: 'tooltipster-default',
    touchDevices: false,
    trigger: 'hover'
 })     
})

function updateStartTime(time) {
  $("#typingTime").text(time)
  startTime = time
}

function updatePhraseLength () {
  let phrase = $(".phrase").text();
  let numberOfWords = phrase.split(" ").length;
  let lenPhrase = $("#phraseLength")
  lenPhrase.text(numberOfWords)
  
}

function initializeCounters () {
  field.on("input", () => {
    let content = field.val()
    let wordQuantity = content.split(/\S+/).length - 1
    $("#charCounter").text(content.length)
    $("#wordCounter").text(wordQuantity)
  })
}

function initializeStopwatch () {
  $("#reloadButton").attr("disabled", true)
  field.one("focus", () => {
    let timeLeft = $("#typingTime").text()
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

function endGame () {
  field.attr("disabled", true)
  $("#reloadButton").attr("disabled", false)
  field.toggleClass("disabledField")
  scoreboardInsert();
}

function reloadGame () {
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

function initializeBorder () {
  field.on("input", () => {
  let phrase = $(".phrase").text()
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









