document.addEventListener("DOMContentLoaded", function() {
clearTableButton.addEventListener("click", function() {
    clearTable();
  });

  function clearTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    document.getElementById("nutritionTable").style.display = "none";
    saveButton.style.display = "none"
  }
});