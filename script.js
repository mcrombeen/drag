document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const fab = document.getElementById('fab');
    const imagePicker = document.getElementById('image-picker');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let image = null;
    let isDragging = false;

    function loadImage(file, stored = false) {
        const img = new Image();

        if (stored) {
            img.src = file;
        } else {
            const reader = new FileReader();
            reader.onload = (event) => {
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }

        img.onload = () => {
            const imgX = stored ? parseInt(localStorage.getItem('img_x')) : Math.floor(Math.random() * (canvas.width - img.width));
            const imgY = stored ? parseInt(localStorage.getItem('img_y')) : Math.floor(Math.random() * (canvas.height - img.height));

            image = { img, imgX, imgY };

            if (!stored) {
                localStorage.setItem('img_x', imgX);
                localStorage.setItem('img_y', imgY);
                localStorage.setItem('img_src', img.src);
            }

            drawImage();
        };
    }

    function drawImage() {
        if (image) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image.img, image.imgX, image.imgY);
        }
    }

    fab.addEventListener('click', () => {
        imagePicker.click();
    });

    imagePicker.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            loadImage(file);
        }
    });

    canvas.addEventListener('mousedown', (event) => {
        if (!image) return;
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (mouseX >= image.imgX && mouseX <= image.imgX + image.img.width && mouseY >= image.imgY && mouseY <= image.imgY + image.img.height) {
            isDragging = true;
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDragging && image) {
            image.imgX = event.clientX - image.img.width / 2;
            image.imgY = event.clientY - image.img.height / 2;
            drawImage();
        }
    });

    canvas.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            localStorage.setItem('img_x', image.imgX);
            localStorage.setItem('img_y', image.imgY);
        }
    });

    const storedImgSrc = localStorage.getItem('img_src');
    if (storedImgSrc) {
        loadImage(storedImgSrc, true);
    }
});
