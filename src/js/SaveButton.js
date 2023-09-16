document.addEventListener("DOMContentLoaded", function() {
    // Ajout du gestionnaire d'événements pour le bouton "Save"
saveButton.addEventListener("click", async function () {
    // Récupérez les données d'ingrédients actuelles
    const ingredients = document.getElementById("ingredientsInput").value;

    // Vérifiez à nouveau si les données d'ingrédients ne sont pas vides
    if (ingredients.trim() === "") {
      alert("Please enter ingredients before saving.");
      return;
    }

    // Envoyez les données d'ingrédients à votre point de terminaison "mainapi"
    const apiUrl = "https://example.com/mainapi"; // Remplacez par votre URL réelle
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "ingredients" : ingredients.split("\n") }),
    };

    try {
      const response = await fetch(apiUrl, requestData);

      if (response.ok) {
        alert("Ingredients saved successfully!");
      } else {
        console.error("Error saving ingredients:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while saving ingredients:", error);
    }
  });
})