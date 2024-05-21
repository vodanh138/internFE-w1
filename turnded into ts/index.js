"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('btn_searching');
    let searchInput = document.getElementById('search_bar');
    const imageGallery = document.getElementById('image_gallery');
    const hotKeywords = Array.from(document.querySelectorAll('.hot_keyword'));
    const unsplashAccessKey = 'GIusLuPh-B6a3733fvbYTWc4JPVzIv_98g2RW1gOi4s';
    let page = 1;
    let loading = false;
    const fetchImagesFromUnsplash = (query, page) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashAccessKey}&count=50&page=${page}`);
        const data = yield response.json();
        return data.map((photo) => photo.urls.small);
    });
    const loadImages = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = '') {
        loading = true;
        const images = yield fetchImagesFromUnsplash(query, page);
        images.forEach((src) => {
            const img = document.createElement('img');
            img.src = src;
            imageGallery.appendChild(img);
        });
        loading = false;
    });
    const loadMoreImages = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!loading) {
            page++;
            const query = searchInput.value;
            yield loadImages(query);
        }
    });
    searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = searchInput.value;
        page = 1;
        imageGallery.innerHTML = '';
        yield loadImages(query);
    }));
    hotKeywords.forEach(button => {
        button.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            let query = button.textContent;
            query ? searchInput.value = query : searchInput.value = "";
            query ? query : query = '';
            page = 1;
            imageGallery.innerHTML = '';
            yield loadImages(query);
        }));
    });
    loadImages();
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadMoreImages();
        }
    });
});
