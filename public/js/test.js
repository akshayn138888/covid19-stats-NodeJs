let area = document.getElementsByTagName("area");
for (let i = 0; i < area.length; i++) {
  area[i].addEventListener("click", function(event) {
    fetch("https://covid-193.p.rapidapi.com/statistics", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "576d01f711msh95c5bc8d82ef3ddp14b0edjsnf2c4fb404008"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Success:", data);
      })
      .catch(err => {
        console.error("Error:", err);
      });
  });
}
