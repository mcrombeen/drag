document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const fab = document.getElementById('fab');
    const imagePicker = document.getElementById('image-picker');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let img, imgX, imgY, isDragging = false;

    function loadImage(file) {
        img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            imgX = Math.floor(Math.random() * (canvas.width - img.width));
            imgY = Math.floor(Math.random() * (canvas.height - img.height));
            localStorage.setItem('imgX', imgX);
            localStorage.setItem('imgY', imgY);
            drawImage();
        };
    }

    function drawImage() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (img) {
            ctx.drawImage(img, imgX, imgY);
        }
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

        if (mouseX >= imgX && mouseX <= imgX + img.width && mouseY >= imgY && mouseY <= imgY + img.height) {
            isDragging = true;
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDragging) {
            imgX = event.clientX - img.width / 2;
            imgY = event.clientY - img.height / 2;
            drawImage();
        }
    });

    canvas.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            localStorage.setItem('imgX', imgX);
            localStorage.setItem('imgY', imgY);
        }
    });

    if (localStorage.getItem('imgX') && localStorage.getItem('imgY')) {
        imgX = parseInt(localStorage.getItem('imgX'));
        imgY = parseInt(localStorage.getItem('imgY'));
        drawImage();
    }
});
