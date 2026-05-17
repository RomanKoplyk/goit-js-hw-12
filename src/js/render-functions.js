import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more-btn");

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images, isAppend = false) {
    const markup = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
                <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <div class="info-item"><b>Likes</b><span>${likes}</span></div>
        <div class="info-item"><b>Views</b><span>${views}</span></div>
        <div class="info-item"><b>Comments</b><span>${comments}</span></div>
        <div class="info-item"><b>Downloads</b><span>${downloads}</span></div>
      </div>
    </li>`
        )
        .join("");
  if (isAppend) {
    galleryContainer.insertAdjacentHTML("beforeend", markup);
  } else {
    galleryContainer.innerHTML = markup;
  }
  
  lightbox.refresh();
};

export function clearGallery() {
  galleryContainer.innerHTML = "";
}

export function showLoader() {
  loader.classList.add("is-visible");
}


export function hideLoader() {
  loader.classList.remove("is-visible");
}

export function showLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.add("is-visible");
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.remove("is-visible");
}