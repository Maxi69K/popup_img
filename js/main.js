const popup = document.getElementById('gallery-preview');
const closeBtn = document.getElementById('closeBtn');
const images = document.querySelectorAll('.gallery > a');
const popupImage = document.getElementById('popupImage');
let currentIndex = null;
let index = null;

closeBtn.addEventListener('click', hidePopup);
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'Escape':
            popup.classList.remove('visible');
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case 'ArrowLeft':
            showPreviousImage();
            break;     
    }
});

function showNextImage() {
    currentIndex = popup.dataset.currentIndex;
    currentIndex++;
    currentIndex = currentIndex % images.length;
    let link = images[currentIndex].href;
    popupImage.src = link;
    popup.dataset.currentIndex = currentIndex;
    popup.classList.add('visible');
}

function showPreviousImage() {
    currentIndex = popup.dataset.currentIndex;
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length-1;
    }
    let link = images[currentIndex].href;
    popupImage.src = link;
    popup.dataset.currentIndex = currentIndex;
    popup.classList.add('visible');
}

function hidePopup() {
    popup.classList.remove('visible');
}

function bindGalleryItems() {
    index = 0;
    for (let image of images) {
        image.addEventListener('click', showImage);
        image.dataset.index = index;
        index++;
    }
}

bindGalleryItems();

function showImage(e) {
    e.preventDefault();
    let link = e.target.parentElement.href;
    let index = e.target.parentElement.dataset.index;
    popupImage.src = link;
    popup.dataset.currentIndex = index;
    popup.classList.add('visible');
}

/*
(() => {
    let popupImages = {
        popup: document.getElementById('gallery-preview'),
        closeBtn: document.getElementById('closeBtn'),
        images: document.querySelectorAll('.gallery > a'),
        popupImage: document.getElementById('popupImage'),
        init: () => {
            popupImages.bindGalleryItems();
            closeBtn.addEventListener('click', popupImages.hidePopup);
            window.addEventListener('keydown', e => {
                switch (e.key) {
                    case 'Escape':
                        popupImages.popup.classList.remove('visible');
                        break;
                }
            });
        },
        hidePopup: () => popupImages.popup.classList.remove('visible'),
        bindGalleryItems: () => popupImages.images.forEach(image => image.addEventListener('click', popupImages.showImage)),
        showImage: function (e) {
            e.preventDefault();
            let link = this.getAttribute('href');
            popupImages.popupImage.src = link;
            popupImages.popup.classList.add('visible');
        }
    }
    popupImages.init();
})()
*/