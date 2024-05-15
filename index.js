document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('btn_searching');
    let searchInput = document.getElementById('search_bar');
    const imageGallery = document.getElementById('image_gallery');
    const hotKeywords = document.querySelectorAll('.hot_keyword');
    const unsplashAccessKey = 'GIusLuPh-B6a3733fvbYTWc4JPVzIv_98g2RW1gOi4s';

    let page = 1;
    let loading = false;

    const fetchImagesFromUnsplash = async (query, page) => {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashAccessKey}&count=50&page=${page}`);
        const data = await response.json();
        return data.map(photo => photo.urls.small);
    };

    const loadImages = async (query) => {
        loading = true;
        const images = await fetchImagesFromUnsplash(query, page);
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            imageGallery.appendChild(img);
        });
        loading = false;
    };

    const loadMoreImages = async () => {
        if (!loading) {
            page++;
            const query = searchInput.value;
            await loadImages(query);
        }
    };


    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        page = 1;
        imageGallery.innerHTML = '';
        await loadImages(query);
    });

    hotKeywords.forEach(button => {
        button.addEventListener('click', async () => {
            const query = button.textContent;
            searchInput.value = query;
            page = 1;
            imageGallery.innerHTML = '';
            await loadImages(query);
        });
    });

    loadImages();

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadMoreImages();
        }
    });
});
