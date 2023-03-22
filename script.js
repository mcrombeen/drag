document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const fab = document.getElementById('fab');
    const imagePicker = document.getElementById('image-picker');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let images = [];
    let isDragging = false;

    function loadImage(file, stored = false) {
        const img = new Image();
        img.src = stored ? file : URL.createObjectURL(file);

        img.onload = () => {
            const imgX = stored ? parseInt(localStorage.getItem(img.src + '_x')) : Math.floor(Math.random() * (canvas.width - img.width));
            const imgY = stored ? parseInt(localStorage.getItem(img.src + '_y')) : Math.floor(Math.random() * (canvas.height - img.height));

            images.push({ img, imgX, imgY });
            localStorage.setItem(img.src + '_x', imgX);
            localStorage.setItem(img.src + '_y', imgY);
            drawImages();
        };
    }

    function drawImages() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        images.forEach(({ img, imgX, imgY }) => {
            ctx.drawImage(img, imgX, imgY);
        });
    }

    fab.addEventListener('click', () => {
        imagePicker.click();
    });

    imagePicker.addEventListener('change', (event) => {
        const file = event.target.files[0];
        loadImage(file);
    });

    canvas.addEventListener('mousedown', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        images.forEach((image, index) => {
            if (mouseX >= image.imgX && mouseX <= image.imgX + image.img.width && mouseY >= image.imgY && mouseY <= image.imgY + image.img.height) {
                isDragging = true;
                images.splice(index, 1);
                images.push(image);
            }
        });
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const image = images[images.length - 1];
            image.imgX = event.clientX - image.img.width / 2;
            image.imgY = event.clientY - image.img.height / 2;
            drawImages();
        }
    });

    canvas.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            const image = images[images.length - 1];
            localStorage.setItem(image.img.src + '_x', image.imgX);
            localStorage.setItem(image.img.src + '_y', image.imgY);
        }
    });

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.endsWith('_x')) {
            const imgSrc = key.slice(0, -2);
            loadImage(imgSrc, true);
        }
    }
});
