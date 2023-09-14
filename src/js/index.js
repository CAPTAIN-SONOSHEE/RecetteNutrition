document.addEventListener("DOMContentLoaded", function() {
  const fetchDataButton = document.getElementById("fetchDataButton");

  fetchDataButton.addEventListener("click", async function() {
    const tableBody = document.getElementById("tableBody");
    const ingredientsInput = document.getElementById("ingredientsInput").value;

    tableBody.innerHTML = "";

    if (ingredientsInput.trim() === "") {
      alert("Please enter ingredients before fetching data.");
      return;
    }

    await fetchNutritionData(ingredientsInput);
    
    const nutritionTable = document.getElementById("nutritionTable");
    if (nutritionTable.style.display === "none") {
      nutritionTable.style.display = "table";
    }

    clearTableButton.addEventListener("click", function() {
      clearTable();
    });
  });


async function fetchNutritionData(ingredients) {
    const url = "https://localhost:7201/api/edamam-nutrition";
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "ingr": ingredients.split("\n")
      })
    };

    try {
      const response = await fetch(url, requestData);
      raw = await response.text();
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

       qtyCell.textContent = ingredient.parsed[0].quantity ? ingredient.parsed[0].quantity.toFixed(1) : "N/A";
       
       unitCell.textContent = ingredient.parsed[0].measure ? ingredient.parsed[0].measure : "N/A";
      
       foodCell.textContent = ingredient.parsed[0].food ? ingredient.parsed[0].food : "N/A";
       
       caloriesCell.textContent = ingredient.parsed[0].nutrients.ENERC_KCAL.quantity ? ingredient.parsed[0].nutrients.ENERC_KCAL.quantity.toFixed(1) + " " + ingredient.parsed[0].nutrients.ENERC_KCAL.unit : "N/A";
          
       weightCell.textContent = ingredient.parsed[0].weight ? ingredient.parsed[0].weight.toFixed(1) + " g"  : "N/A";

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
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  function clearTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    document.getElementById("nutritionTable").style.display = "none";
  }
});

/*document.addEventListener("DOMContentLoaded", function() {
  const fetchDataButton = document.getElementById("fetchDataButton");
  const ingredientsInput = document.getElementById("ingredientsInput");

  fetchDataButton.addEventListener("click", async function() {
    const tableBody = document.getElementById("tableBody");
    const ingredients = ingredientsInput.value;

    tableBody.innerHTML = "";

    if (ingredients.trim() === "") {
      alert("Veuillez entrer des ingrédients avant de récupérer les données.");
      return;
    }

    try {
      const response = await fetch('https://localhost:7201/api/edamam-nutrition', { // Mettez à jour l'URL ici
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients })
      });

      if (response.ok) {
        const data = await response.json();
        // Traitez les données ici
      } else {
        console.error('Erreur lors de la récupération des données :', response.statusText);
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  });
});*/

