const scoreboardInsert = () => {
  let tableBody = $(".scoreboard").find("tbody")
  let user = "Douglas"
  let numberOfWords = $("#wordCounter").text()

  let line = newLine(user, numberOfWords)
  line.find(".removeButton").click(function(event) {
    event.preventDefault();
    $(this).parent().parent().remove();
  })

  tableBody.append(line)
}

const newLine = (user, numberOfWords) => {
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