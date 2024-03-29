$("#scoreboardButton").click(showScoreboard)
$("#syncButton").click(scoreboardSync)

function scoreboardInsert() {
  let tableBody = $(".scoreboard").find("tbody")
  let user = $("#users").val()
  let numberOfWords = $("#wordCounter").text()

  let line = newLine(user, numberOfWords)
  line.find(".removeButton").click(function(event) {
    event.preventDefault();
    let line = $(this).parent().parent();
    line.fadeOut(1000);
    setTimeout(function(){
      line.remove();
    }, 1000)
    
  })

  tableBody.append(line)
  $(".scoreboard").slideDown(500)
  scrollScoreboard()
}

function scrollScoreboard() {
  let scoreboardPosition = $(".scoreboard").offset().top
  $("html, body").animate(
    {
      scrollTop: scoreboardPosition
    }, 1000)
}

function newLine(user, numberOfWords) {
  let line = $("<tr>")
  let userColumn = $("<td>").text(user)
  let wordColumn = $("<td>").text(numberOfWords)
  let removeColumn = $("<td>")

  let link = $("<a>").addClass("removeButton").attr("href", "#")
  let icon = $("<i>").addClass("small").addClass("material-icons").text("delete")

  link.append(icon)
  removeColumn.append(link)
  line.append(userColumn)
  line.append(wordColumn)
  line.append(removeColumn)

  return line
}

function showScoreboard() {
  $(".scoreboard").stop().slideToggle(800)
  scrollScoreboard()
}

function scoreboardSync() {
  let scoreboard = []
  let lines = $("tbody>tr")

  lines.each((index, td) => {
    let user = $(td).find("td:nth-child(1)").text()
    let words = $(td).find("td:nth-child(2)").text()
    
    let score = {
      usuario: user,
      pontos: words
    }

    scoreboard.push(score)
  })

  let data = {
    placar: scoreboard
  }

  $.post("http://localhost:3000/placar", data, function() {
    console.log("Dados salvos no servidor.");
    $("#syncButton .tooltip").tooltipster({trigger: "custom"}).tooltipster("open").tooltipster("content", "Sincronizado com sucesso.")
  }).fail(function() {
    $("#syncButton .tooltip").tooltipster({trigger: "custom"}).tooltipster("open").tooltipster("content", "Erro ao sincronizar.")
  }).always(function() {
    setTimeout(function() {
      $("#syncButton .tooltip").tooltipster({trigger: "custom"}).tooltipster("close").tooltipster("content", "Salvar placar no servidor.")
    }, 1500)
  }) 
}

function updateScoreboard() {
  $.get("http://localhost:3000/placar", function(data) {
    data.forEach((data) => {
      let line = newLine(data.usuario, data.pontos)
      line.find(".removeButton").click(function(event) {
        event.preventDefault();
        let line = $(this).parent().parent();
        line.fadeOut(1000);
        setTimeout(function(){
          line.remove();
        }, 1000)
        
      })
      $("tbody").append(line)
    })
  })
}