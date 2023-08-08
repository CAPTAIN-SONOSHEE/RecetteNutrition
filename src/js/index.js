async function fetchNutritionData() {
    const url = "https://api.edamam.com/api/nutrition-details?app_id=8ec854ea&app_key=35a97e80e414231dd6f81d6d5501fec9";
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "title": "string",
        "ingr": [
          "1 cup rice",
          "10 oz chickpeas",
          "12 oz pineapple"
        ]
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
      });

      // Remplir la carte avec les données de nutrition
      document.getElementById("totalFat").textContent = data.totalNutrients.FAT.quantity.toFixed(1) + " " + data.totalNutrients.FAT.unit;
      document.getElementById("saturatedFat").textContent = data.totalNutrients.FASAT.quantity.toFixed(1) + " " + data.totalNutrients.FASAT.unit;
      document.getElementById("transFat").textContent = data.totalNutrients.FATRN.quantity.toFixed(1) + " " + data.totalNutrients.FATRN.unit;
      document.getElementById("cholesterol").textContent = Math.round(data.totalNutrients.CHOLE.quantity) + " " + data.totalNutrients.CHOLE.unit;
      document.getElementById("sodium").textContent = Math.round(data.totalNutrients.NA.quantity) + " " + data.totalNutrients.NA.unit;
      document.getElementById("totalCarbohydrate").textContent = data.totalNutrients.CHOCDF.quantity.toFixed(1) + " " + data.totalNutrients.CHOCDF.unit;
      document.getElementById("dietaryFiber").textContent = data.totalNutrients.FIBTG.quantity.toFixed(1) + " " + data.totalNutrients.FIBTG.unit;
      document.getElementById("totalSugars").textContent = data.totalNutrients.SUGAR.quantity.toFixed(1) + " " + data.totalNutrients.SUGAR.unit;
      document.getElementById("protein").textContent = Math.round(data.totalNutrients.PROCNT.quantity) + " " + data.totalNutrients.PROCNT.unit;
      document.getElementById("vitaminD").textContent = data.totalNutrients.VITD.quantity.toFixed(1) + " " + data.totalNutrients.VITD.unit;
      document.getElementById("calcium").textContent = data.totalNutrients.CA.quantity.toFixed(1) + " " + data.totalNutrients.CA.unit;
      document.getElementById("iron").textContent = data.totalNutrients.FE.quantity.toFixed(1) + " " + data.totalNutrients.FE.unit;
      document.getElementById("potassium").textContent = Math.round(data.totalNutrients.K.quantity) + " " + data.totalNutrients.K.unit;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Appel de la fonction pour récupérer et afficher les données de nutrition
  fetchNutritionData();