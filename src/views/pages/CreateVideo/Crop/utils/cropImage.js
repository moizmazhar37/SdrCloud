// Function to create an image element from a URL and return it as a promise
export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
// Function to convert degrees to radians
export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}
// Function to calculate the rotated size of an element
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}
// Function to get a cropped image based on the given parameters
export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // Calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;
  // Set canvas context to the center and apply rotation and flipping
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);
  // Draw the image on the canvas
  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // Resize the canvas to the size of the cropped area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  // Put the cropped image data back on the canvas
  ctx.putImageData(data, 0, 0);
  // Return the cropped image as a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      file.name = "cropped.jpeg";
      resolve({ file: file, url: URL.createObjectURL(file) });
    }, "image/jpeg");
  });
}
