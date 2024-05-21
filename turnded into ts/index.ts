document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('btn_searching') as HTMLButtonElement;
    let searchInput = document.getElementById('search_bar') as HTMLButtonElement;
    const imageGallery = document.getElementById('image_gallery') as HTMLButtonElement;
    const hotKeywords: HTMLButtonElement[] = Array.from(document.querySelectorAll('.hot_keyword')) as HTMLButtonElement[];

    const unsplashAccessKey = 'GIusLuPh-B6a3733fvbYTWc4JPVzIv_98g2RW1gOi4s';

    let page = 1;
    let loading = false;

    const fetchImagesFromUnsplash = async (query: string, page: number) => {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashAccessKey}&count=50&page=${page}`);
        const data = await response.json();
        return data.map((photo: any) => photo.urls.small);
    };

    const loadImages = async (query: string = '') => {
        loading = true;
        const images = await fetchImagesFromUnsplash(query, page);
        images.forEach((src: string) => {
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
            let query = button.textContent;
            query ? searchInput.value = query : searchInput.value = "";
            query ? query : query = '';
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
