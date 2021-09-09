import galleryItems from "./app.js";

const galleryItemsRef = document.querySelector(".js-gallery");
const divLightboxRef = document.querySelector(".js-lightbox");
const imgLightboxRef = document.querySelector(".lightbox__image");


const createItemsRef = (elements) => {
  return elements
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
      <a class="gallery__link"
      href = "${original}">
        <img class="gallery__image"
        src = "${preview}" 
        data-source = "${original}" 
        alt ="${description}"/>
       </a>
    </li>`;
    })
    .join("");
};
galleryItemsRef.insertAdjacentHTML("afterbegin", createItemsRef(galleryItems));


const openModalClick = (e) => {
  e.preventDefault();

  if (e.target.nodeName === "IMG") {
    imgLightboxRef.src = e.target.dataset.source;
    imgLightboxRef.alt = e.target.alt;
    divLightboxRef.classList.add("is-open");
  }
};
galleryItemsRef.addEventListener("click", openModalClick);


const escapeClick = e => {
  if (e.key === "Escape") {
    divLightboxRef.classList.remove("is-open");
  }
};
window.addEventListener("keyup", escapeClick);


const closeModalClick = e => {
  if (e.target.nodeName !== "IMG") {
    divLightboxRef.classList.remove("is-open");

    imgLightboxRef.src = "";
    imgLightboxRef.alt = "";
  }
};
window.addEventListener("click", closeModalClick);
