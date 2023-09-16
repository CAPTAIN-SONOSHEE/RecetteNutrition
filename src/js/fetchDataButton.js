document.addEventListener("DOMContentLoaded", function() {
  const fetchDataButton = document.getElementById("fetchDataButton");
  const saveButton = document.getElementById("saveButton");

  fetchDataButton.addEventListener("click", async function() {
    const tableBody = document.getElementById("tableBody");
    const ingredientsInput = document.getElementById("ingredientsInput").value;

    tableBody.innerHTML = "";

    if (ingredientsInput.trim() === "") {
      alert("Please enter ingredients before fetching data.");
      return;
    }

    saveButton.style.display = "inline";
    await fetchNutritionData(ingredientsInput);
    
    const nutritionTable = document.getElementById("nutritionTable");
    if (nutritionTable.style.display === "none") {
      nutritionTable.style.display = "table";
    }

    
  });

  
async function fetchNutritionData(ingredients) {
    const url = "https://localhost:7290/middleman";
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "ingredients": ingredients.split("\n")
      })
    };

    try {
      const response = await fetch(url, requestData);
      const data = await response.json();
      
      // Remplir le tableau avec les données de l'appel API
      const tableBody = document.getElementById("tableBody");
      data.ingredients.forEach(ingredient => {
        const row = document.createElement("tr");
        const qtyCell = document.createElement("td");
        const unitCell = document.createElement("td");
        const foodCell = document.createElement("td");
        const caloriesCell = document.createElement("td");
        const weightCell = document.createElement("td");
              // Vérifiez si ingredient.parsed[0] est défini
        if (ingredient.parsed[0]) {
          const parsed = ingredient.parsed[0];
          
          // Vérifiez si les propriétés que vous souhaitez afficher sont définies
          qtyCell.textContent = parsed.quantity ? parsed.quantity.toFixed(1) : "N/A";
          unitCell.textContent = parsed.measure ? parsed.measure : "N/A";
          foodCell.textContent = parsed.food ? parsed.food : "N/A";
          
          // Vérifiez si ENERC_KCAL est défini
          if (parsed.nutrients && parsed.nutrients.ENERC_KCAL) {
            caloriesCell.textContent = parsed.nutrients.ENERC_KCAL.quantity ? parsed.nutrients.ENERC_KCAL.quantity.toFixed(1) + " " + parsed.nutrients.ENERC_KCAL.unit : "N/A";
          } else {
            caloriesCell.textContent = "N/A";
          }
          
          weightCell.textContent = parsed.weight ? parsed.weight.toFixed(1) + " g" : "N/A";
        } else {
          // Si ingredient.parsed[0] n'est pas défini, attribuez "N/A" à toutes les cellules
          qtyCell.textContent = "N/A";
          unitCell.textContent = "N/A";
          foodCell.textContent = "N/A";
          caloriesCell.textContent = "N/A";
          weightCell.textContent = "N/A";
        }
        row.appendChild(qtyCell);
        row.appendChild(unitCell);
        row.appendChild(foodCell);
        row.appendChild(caloriesCell);
        row.appendChild(weightCell);
        tableBody.appendChild(row);

        function formatNutrientValue(value, unit) {
          return value ? `${value.toFixed(1)} ${unit || "-"}` : "-";
        }
        
        document.getElementById("totalFat").textContent = formatNutrientValue(data.totalNutrients.FAT?.quantity, data.totalNutrients.FAT?.unit);
        document.getElementById("saturatedFat").textContent = formatNutrientValue(data.totalNutrients.FASAT?.quantity, data.totalNutrients.FASAT?.unit);
        document.getElementById("transFat").textContent = formatNutrientValue(data.totalNutrients.FATRN?.quantity, data.totalNutrients.FATRN?.unit);
        document.getElementById("cholesterol").textContent = formatNutrientValue(Math.round(data.totalNutrients.CHOLE?.quantity), data.totalNutrients.CHOLE?.unit);
        document.getElementById("sodium").textContent = formatNutrientValue(Math.round(data.totalNutrients.NA?.quantity), data.totalNutrients.NA?.unit);
        document.getElementById("totalCarbohydrate").textContent = formatNutrientValue(data.totalNutrients.CHOCDF?.quantity, data.totalNutrients.CHOCDF?.unit);
        document.getElementById("dietaryFiber").textContent = formatNutrientValue(data.totalNutrients.FIBTG?.quantity, data.totalNutrients.FIBTG?.unit);
        document.getElementById("totalSugars").textContent = formatNutrientValue(data.totalNutrients.SUGAR?.quantity, data.totalNutrients.SUGAR?.unit);
        document.getElementById("protein").textContent = formatNutrientValue(Math.round(data.totalNutrients.PROCNT?.quantity), data.totalNutrients.PROCNT?.unit);
        document.getElementById("vitaminD").textContent = formatNutrientValue(data.totalNutrients.VITD?.quantity, data.totalNutrients.VITD?.unit);
        document.getElementById("calcium").textContent = formatNutrientValue(data.totalNutrients.CA?.quantity, data.totalNutrients.CA?.unit);
        document.getElementById("iron").textContent = formatNutrientValue(data.totalNutrients.FE?.quantity, data.totalNutrients.FE?.unit);
        document.getElementById("potassium").textContent = formatNutrientValue(Math.round(data.totalNutrients.K?.quantity), data.totalNutrients.K?.unit);

       
       
      });

      
      const totalCaloriesRow = document.createElement("tr");
      const totalCaloriesCell = document.createElement("td");
      totalCaloriesCell.colSpan = 4; // Définissez la propriété colSpan sur 4 pour qu'elle occupe 4 colonnes
      totalCaloriesCell.style.textAlign = "center"; // Centrez le contenu
      totalCaloriesCell.textContent = `Total Calories: ${ data.calories ? data.calories.toFixed(1) + " kcal" : "N/A"}`;
      totalCaloriesRow.appendChild(totalCaloriesCell);
      tableBody.appendChild(totalCaloriesRow)

    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
});


