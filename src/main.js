import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from "./js/render-functions.js";

const searchForm = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more-btn");

let userQuery = "";
let currentPage = 1;
const perPage = 15;

searchForm.addEventListener("submit", handleSearch);
if (loadMoreBtn) loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSearch(event) {
    event.preventDefault();

    const query = event.currentTarget.elements[`search-text`].value.trim();

    if (!query) {
        iziToast.warning({
            message: "Please enter a search query!",
            position: 'topRight'
        });
        return;
    }

    userQuery = query;

    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(userQuery, currentPage);

        if (data.hits.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
                backgroundColor: '#EF4040',
                messageColor: '#FFF',
                iconColor: '#FFF',
                progressBarColor: '#B51B1B',
            })
            return;
        }
            
        createGallery(data.hits);

        const totalPages = Math.ceil(data.totalHits / perPage);
        if (currentPage < totalPages) {
            showLoadMoreButton();
        }
    }
        catch (error) {
            console.log(error);
            iziToast.error({
                message: "Something went wrong. Please try again later!",
                position: 'topRight'
            });
        }
        finally {
            hideLoader();
            event.target.reset();
    }
}

async function  handleLoadMore() {
    currentPage += 1;
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(userQuery, currentPage);

        createGallery(data.hits);

        smoothScroll();

        const totalPages = Math.ceil(data.totalHits / perPage);

        if (currentPage >= totalPages) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        console.log(error);
        iziToast.error({
            message: "Failed to load more images. Please try again!",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }
}

function smoothScroll() {
    const galleryItem = document.querySelector(".gallery-item");

    if (galleryItem) {
        const { height: cardHeight } = galleryItem.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
    }
}