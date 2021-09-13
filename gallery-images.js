import galleryItems from "./app.js";

const galleryItemsRef = document.querySelector(".js-gallery");
const divLightboxRef = document.querySelector(".js-lightbox");
const imgLightboxRef = document.querySelector(".lightbox__image");

const createItemsRef = galleryItems
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
      <a class="gallery__link"
      href = "${original}">
        <img class="gallery__image"
        src = "${preview}" 
        data-source = "${original}" 
        alt ="${description}"
        data-index="${index}"/>
        
       </a>
    </li>`;
    })
    .join("");

galleryItemsRef.innerHTML=createItemsRef

const openModalClick = (e) => {
  e.preventDefault();

  if (e.target.localName === "img") {
    imgLightboxRef.src = e.target.dataset.source;
    imgLightboxRef.alt = e.target.alt;
    imgLightboxRef.dataset.index = e.target.dataset.index;
    divLightboxRef.classList.add("is-open");
  }
};
galleryItemsRef.addEventListener("click", openModalClick);

const closeModalClick = (e) => {
  if (e.target.localName !== "img") {
    divLightboxRef.classList.remove("is-open");

    imgLightboxRef.src = "";
    imgLightboxRef.alt = "";
  }
};
window.addEventListener("click", closeModalClick);

const escapeClick = (e) => {
  if (e.key === "Escape") {
    divLightboxRef.classList.remove("is-open");
  }
};
window.addEventListener("keyup", escapeClick);


function indexCurretImg(index, step = 0) {
  imgLightboxRef.dataset.index = `${index + step}`;
  imgLightboxRef.src = galleryItems[index + step].original;
  imgLightboxRef.alt = galleryItems[index + step].description;
}


function clickArrowRight() {
  let index = +imgLightboxRef.dataset.index;
  if (index === galleryItems.length - 1) {
    indexCurretImg(0);
    return;
  }
  indexCurretImg(index, 1);
}


function clickArrowLeft() {
  let index = +imgLightboxRef.dataset.index;

  if (index === 0) {
    indexCurretImg(galleryItems.length - 1);
    return;
  }
  indexCurretImg(index, -1);
}


window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    clickArrowRight();
  }
  if (e.code === "ArrowLeft") {
    clickArrowLeft();
  }
});

 // зачищаем слушателя событий 
if (!divLightboxRef.classList.contains("is-open")) {
  window.removeEventListener("keyup", escapeClick);
  window.removeEventListener("click", closeModalClick);
}
