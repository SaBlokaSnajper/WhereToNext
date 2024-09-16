let slideIndex = 1;
showSlides(slideIndex);
autoSlides();

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function autoSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(autoSlides, 8000);
}
document.addEventListener("DOMContentLoaded", function () {
  const btnSearch = document.getElementById("search-btn");
  const btnClear = document.getElementById("clear-btn");
  const inputSrc = document.getElementById("destinationInput");
  function searchDestination() {
    const input = document
      .getElementById("destinationInput")
      .value.toLowerCase();
    const resultDiv = document.getElementById("result");

    resultDiv.style.backgroundColor = "white";
    resultDiv.innerHTML = "";

    console.log("Searching for:", input);

    fetch("api.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        let found = false;

        data.countries.forEach((country) => {
          const city = country.cities.find((city) =>
            city.name.toLowerCase().includes(input)
          );

          if (city) {
            found = true;
            console.log("City found:", city);
            resultDiv.innerHTML += `<img id="cityimg" src="${city.imageUrl}" alt="Image of ${city.name}" />`;
            resultDiv.innerHTML += `<h2><strong>${city.name}</strong></h2>`;
            resultDiv.innerHTML += `<p><strong>Description:</strong> ${city.description}</p>`;
            resultDiv.innerHTML += `<br><button class="visit">Visit</button><br>`;
            resultDiv.innerHTML += `<br>`;
          }
        });

        if (
          input.includes("temple") ||
          input.includes("taj") ||
          input.includes("angkor")
        ) {
          data.temples.forEach((temple) => {
            found = true;
            console.log("Temple found:", temple);
            resultDiv.innerHTML += `<img class="cityimg" src="${temple.imageUrl}" alt="Image of ${temple.name}" />`;
            resultDiv.innerHTML += `<h2><strong>${temple.name}</strong></h2>`;
            resultDiv.innerHTML += `<p><strong>Description:</strong> ${temple.description}</p>`;
            resultDiv.innerHTML += `<br><button class="visit">Visit</button><br>`;
            resultDiv.innerHTML += `<br>`;
          });
        }

        if (
          input.includes("beach") ||
          input.includes("bora") ||
          input.includes("copacabana")
        ) {
          data.beaches.forEach((beach) => {
            found = true;
            console.log("Beach found:", beach); // Debugging log
            resultDiv.innerHTML += `<img id="cityimg" src="${beach.imageUrl}" alt="Image of ${beach.name}" />`;
            resultDiv.innerHTML += `<h2><strong>${beach.name}</strong></h2>`;
            resultDiv.innerHTML += `<p><strong>Description:</strong> ${beach.description}</p>`;
            resultDiv.innerHTML += `<br><button class="visit">Visit</button><br>`;
            resultDiv.innerHTML += `<br>`;
          });
        }

        if (!found) {
          console.log("No matches found.");
          resultDiv.innerHTML = "Not found.";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        resultDiv.innerHTML = "An error occurred while fetching data.";
      });
  }

  btnSearch.addEventListener("click", () => {
    searchDestination();
    document.getElementById("hero").style.backgroundColor = "black";
  });

  inputSrc.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchDestination();
    }
  });

  btnClear.addEventListener("click", () => {
    document.getElementById("destinationInput").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").style.backgroundColor = "";
  });
});
