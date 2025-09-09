import html2canvas from "html2canvas";

export const captureScreenshot = (elementId) => {
  const divToCapture = document.getElementById(elementId);

  if (divToCapture) {
    return html2canvas(divToCapture).then((canvas) => {
      return canvas.toDataURL();
    });
  }

  return Promise.reject("Element with the given ID not found.");
};
