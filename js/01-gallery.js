// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// Реалізація делегування на div.gallery і отримання url великого зображення.
// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

import { galleryItems } from './gallery-items.js';
// Change code below this line
const gallery = document.querySelector('.gallery');

function onGalleryClick(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  e.preventDefault();

  const sourceImg = e.target.dataset.source;
  const alt = e.target.alt;
  openModal(sourceImg, alt);
}


function makeGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
    })
    .join("");
}
gallery.insertAdjacentHTML('beforeend', makeGalleryMarkup(galleryItems));

function openModal(url, alt) {
  const instance = basicLightbox.create(`
      <img 
      src="${url}" 
      alt="${alt}">
  `);
  instance.show();

  gallery.addEventListener(
    "keyup",
    (e) => {
      if (e.code !== "Escape") {
        return;
      }
      instance.close();
    },
    { once: true }
  );
}

gallery.addEventListener('click', onGalleryClick);