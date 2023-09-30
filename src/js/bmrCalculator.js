var myChart
function calculateBMR() {
    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;
    var age = document.getElementById('age').value;
    var sex = document.getElementById('sex').value;
    var activity = document.getElementById('activity').value;
    
    fetch('https://localhost:7188/calculatebmr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"Weight": weight, "Height": height, "Age": age, "Sex": sex})
    })
    .then(response => response.json())
    .then(data => {
        var bmr = parseFloat(data.bmr.toFixed(2));
        var calories = parseFloat((bmr * activity).toFixed(2));
        document.getElementById('result').textContent = 'Your BMR is: ' + bmr + ' kcal/day' + ' and your daily caloric needs based on activity level are: ' + calories + ' kcal/day';
        
        if(myChart){
            myChart.destroy();
        }
        var ctx = document.getElementById('bmrChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['BMR', 'Calories with Activity'],
                datasets: [{
                    label: 'kcal/day',
                    data: [bmr, calories],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => {
        document.getElementById('result').textContent = 'Error: ' + error;
    });
}