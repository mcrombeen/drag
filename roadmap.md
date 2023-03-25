- [x] on load check for existing images
- [x] create empty canvas with image picker 
- [x] if existing place existing 
- [x] place image and store data

- [ ] allow for multiple selection
- [      it is possible to select multiple images in the file picker dialog. To enable this, you would need to add the multiple attribute to the input element with type "file" in your HTML. This attribute allows users to select more than one file at a time when the file picker dialog opens.
When the 'change' event is triggered for the 'image-picker' input element, you can then access the multiple files selected by the user through the event.target.files property, which is a FileList object. You can iterate through the FileList and call the 'loadImage' function for each file, allowing the script to load and display all selected images on the canvas.

- [ ] menu card with delete function
- [ ] independent styling
- [ To allow each image placed on the canvas to be styled independently, you would need to modify the script to store additional properties for each image object and update the 'drawImages' function to apply those styles when drawing the images. Here's a high-level explanation of the steps:

Update the 'loadImage' function to store additional style properties for each image object. For example, you can store properties like 'opacity', 'rotation', 'scale', etc., along with the 'img', 'imgX', and 'imgY' properties.

Modify the 'drawImages' function to apply the stored style properties for each image when rendering it on the canvas. This may involve using the ctx.save() and ctx.restore() methods to isolate the transformations and styles applied to each image. For example, you can use ctx.globalAlpha for changing the opacity, ctx.rotate() for rotating the image, and ctx.scale() for scaling the image.

Optionally, you can create a user interface (UI) for adjusting the style properties of the selected image. You would need to add event listeners to the UI elements for updating the style properties of the selected image object and then call 'drawImages' to reflect the changes on the canvas.

If you want to store the style properties in localStorage, you'll need to update the code that saves and loads the image properties to include the new style properties as well.

By following these steps, you'll be able to style each image independently, allowing users to adjust properties like opacity, rotation, and scaling for each image placed on the canvas.





- [x] Task 3 (completed)
