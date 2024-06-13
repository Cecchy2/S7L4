const apiKey = "pdhvStg9dyzMqX1NGZqk2n60QAhsv9kUVlYZ4zcctXONVlCfVmTbK2cU";
/* fetch(`https://api.pexels.com/v1/search?query=${query}`); */

document.addEventListener("DOMContentLoaded", () => {
  const loadImg = document.getElementById("load-images");
  const loadSecImg = document.getElementById("load-secondary");

  loadImg.onclick = () => {
    loadImages("wave");
  };
  loadSecImg.onclick = () => {
    loadImages("mountains");
  };

  const loadImages = (query) => {
    fetch(`https://api.pexels.com/v1/search?query=${query}`, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((picture) => {
        creaImmagini(picture.photos);
      })
      .catch((error) => console.log("Error:", error));
  };

  const creaImmagini = (photos) => {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    photos.forEach((photo) => {
      const card = document.createElement("div");
      card.className = "col-4 card mb-4 me-3shadow-sm";
      card.id = "card";

      card.innerHTML = `
      <img src="${photo.src.medium}" alt="${photo.photographer}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${photo.photographer}</h5>
        <p class="card-text">${photo.id}</p>
        <a href="#" class="btn btn-primary view-image" data-id="${photo.id}" data-src="${photo.src.large}">View</a>
        <a href="#" id="hide" class="btn btn-secondary hide-card">Hide</a>
      </div>`;

      gallery.appendChild(card);
    });
  };
  document.getElementById("gallery").addEventListener("click", (event) => {
    if (event.target.classList.contains("hide-card")) {
      event.preventDefault();
      const cardToHide = event.target.closest(".card");
      cardToHide.remove();
    }
  });
});
