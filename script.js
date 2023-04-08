document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const fab = document.getElementById('fab');
    const imagePicker = document.getElementById('image-picker');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let image = null;
    let isDragging = false;
    let selectedImage = null;

    function loadImage(file) {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = (event) => {
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);

        img.onload = () => {
            const imgX = Math.floor(Math.random() * (canvas.width - img.width));
            const imgY = Math.floor(Math.random() * (canvas.height - img.height));

            image = { img, imgX, imgY, width: img.width, height: img.height };
            drawImage();
        };
    }

    function drawImage() {
        if (image) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image.img, image.imgX, image.imgY, image.width, image.height);
        }
    }

    function highlightImage(ctx, image) {
        const { img, imgX, imgY, width, height } = image;
        const padding = 5;
        const highlightColor = 'rgba(0, 255, 0, 0.5)';

        ctx.fillStyle = highlightColor;
        ctx.fillRect(imgX - padding, imgY - padding, width + 2 * padding, height + 2 * padding);
        ctx.drawImage(img, imgX, imgY, width, height);
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

        if (mouseX >= image.imgX && mouseX <= image.imgX + image.width && mouseY >= image.imgY && mouseY <= image.imgY + image.height) {
            isDragging = true;

            // Highlight the selected image
            if (selectedImage !== image) {
                selectedImage = image;
                drawImage();
                highlightImage(ctx, selectedImage);
            }
        } else {
            // Unselect the image
            selectedImage = null;
            drawImage();
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDragging && image) {
            image.imgX = event.clientX - image.width / 2;
            image.imgY = event.clientY - image.height / 2;
            drawImage();
            if (selectedImage) {
                highlightImage(ctx, selectedImage);
            }
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    canvas.addEventListener('wheel', (event) => {
        if (selectedImage) {
            const delta = Math.sign(event.deltaY);
            const step = 16;
            const minWidthHeight = 16;
            const maxWidthHeight = 128;

            const newWidth = selectedImage.width - delta * step;
            const newHeight = selectedImage.height - delta * step;

            if (newWidth >= minWidthHeight && newWidth <= maxWidthHeight && newHeight >= minWidthHeight && newHeight <= maxWidthHeight) {
                selectedImage.width = newWidth;
                selectedImage.height = newHeight;
            }

            drawImage();
            highlightImage(ctx, selectedImage);
        }
    });
