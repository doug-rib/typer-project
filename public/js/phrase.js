$("#phraseButton").click(randomPhrase)
$("#phraseIdButton").click(searchPhrase)

function randomPhrase() {
  $("#spinner").toggle()
  $(".phrase").toggle()
  $.get("http://localhost:3000/frases", changePhrase)
  .fail(function() {
    $("#error").text("Ocorreu um erro, tente novamente.")
    $("#error").toggle()
    setTimeout(function(){
      $("#error").toggle()
    }, 2500)
  })
  .always(function() {
    $("#spinner").toggle()
    $(".phrase").toggle()
  })
}

function changePhrase(data) {
  let phrase = $(".phrase")
  let randomNumber = Math.floor(Math.random() * data.length)
  phrase.text(data[randomNumber].texto)
  updatePhraseLength()
  updateStartTime(data[randomNumber].tempo)
}

function searchPhrase() {
  let idPhrase = $("#idPhrase").val()
  let specificId = {id: idPhrase}

  $("#spinner").toggle()
  $(".phrase").toggle()
  $.get("http://localhost:3000/frases", specificId, changeSpecificPhrase)
  .fail(function() {
    $("#error").text("Id inválido, tente outro número.")
    $("#error").toggle()
    setTimeout(function(){
      $("#error").toggle()
    }, 2500)
  })
  .always(function() {
    $("#spinner").toggle()
    $(".phrase").toggle()
  })
}

function changeSpecificPhrase(data) {
  let phrase = $(".phrase")
  phrase.text(data.texto)
  updatePhraseLength()
  updateStartTime(data.tempo)
}