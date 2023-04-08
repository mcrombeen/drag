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

            image = { img, imgX, imgY };
            drawImage();
        };
    }

    function drawImage() {
        if (image) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image.img, image.imgX, image.imgY);
        }
    }

    function highlightImage(ctx, image) {
        const { img, imgX, imgY } = image;
        const padding = 5;
        const highlightColor = 'rgba(0, 255, 0, 0.5)';

        ctx.fillStyle = highlightColor;
        ctx.fillRect(imgX - padding, imgY - padding, img.width + 2 * padding, img.height + 2 * padding);
        ctx.drawImage(img, imgX, imgY);
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
            image.imgX = event.clientX - image.img.width / 2;
            image.imgY = event.clientY - image.img.height / 2;
            drawImage();
            if (selectedImage) {
                highlightImage(ctx, selectedImage);
            }
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });
});
