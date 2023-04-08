// highlightImage.js
function highlightImage(ctx, image) {
    const { img, imgX, imgY } = image;
    const padding = 5;
    const highlightColor = 'rgba(0, 255, 0, 0.5)';

    ctx.fillStyle = highlightColor;
    ctx.fillRect(imgX - padding, imgY - padding, img.width + 2 * padding, img.height + 2 * padding);
    ctx.drawImage(img, imgX, imgY);
}
