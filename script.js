document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const fab = document.getElementById('fab');
    const imagePicker = document.getElementById('image-picker');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let image = null;
    let isDragging = false;

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
        isDragging = false;
    });
});
