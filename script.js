document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const fab = document.getElementById('fab');
    const imagePicker = document.getElementById('image-picker');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let images = [];
    let isDragging = false;
    let draggedImageIndex;

    function loadImage(file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const imgX = Math.floor(Math.random() * (canvas.width - img.width));
            const imgY = Math.floor(Math.random() * (canvas.height - img.height));
            images.push({ img, imgX, imgY });
            storeImages();
            drawImages();
        };
    }

    function storeImages() {
        const storedImages = images.map(image => {
            return {
                imgSrc: image.img.src,
                imgX: image.imgX,
                imgY: image.imgY
            };
        });
        localStorage.setItem('images', JSON.stringify(storedImages));
    }

    function loadStoredImages() {
        const storedImages = JSON.parse(localStorage.getItem('images'));
        if (storedImages) {
            storedImages.forEach(storedImage => {
                const img = new Image();
                img.src = storedImage.imgSrc;
                img.onload = () => {
                    images.push({ img, imgX: storedImage.imgX, imgY: storedImage.imgY });
                    drawImages();
                };
            });
        }
    }

    function drawImages() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        images.forEach(image => {
            ctx.drawImage(image.img, image.imgX, image.imgY);
        });
    }

    fab.addEventListener('click', () => {
        imagePicker.click();
    });

    imagePicker.addEventListener('change', (event) => {
        loadImage(event.target.files[0]);
    });

    canvas.addEventListener('mousedown', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        images.forEach((image, index) => {
            if (mouseX >= image.imgX && mouseX <= image.imgX + image.img.width && mouseY >= image.imgY && mouseY <= image.imgY + image.img.height) {
                isDragging = true;
                draggedImageIndex = index;
            }
        });
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDragging && draggedImageIndex !== undefined) {
            const image = images[draggedImageIndex];
            image.imgX = event.clientX - image.img.width / 2;
            image.imgY = event.clientY - image.img.height / 2;
            drawImages();
        }
    });

    canvas.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            draggedImageIndex = undefined;
            storeImages();
        }
    });

    loadStoredImages();
});
