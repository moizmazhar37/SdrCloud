import React, { useState, useRef, useEffect } from 'react';
import styles from './ImageModal.module.scss';

const ImageModal = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState('upload');
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep('upload');
      setSelectedImage(null);
      setCroppedImage(null);
      setZoom(100);
      setRotation(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setCurrentStep('crop');
        setZoom(100);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureTransformedImage = () => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const img = new Image();

      img.onload = () => {
        const size = 400;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, size, size);

        ctx.translate(size / 2, size / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        const scale = zoom / 100;
        ctx.scale(scale, scale);
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const transformedImage = canvas.toDataURL('image/jpeg', 0.95);
        resolve(transformedImage);
      };

      img.src = selectedImage;
    });
  };

  const handleCrop = async () => {
    try {
      const transformedImage = await captureTransformedImage();
      setCroppedImage(transformedImage);
      setCurrentStep('preview');
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const handleSave = () => {
    if (croppedImage) {
      onSave(croppedImage);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const renderUploadStep = () => (
    <div className={styles.contentWrapper}>
      <div className={styles.uploadArea}>
        <p>Click to add image from your device.</p>
        <button className={styles.uploadButton} onClick={handleUploadClick}>
          Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className={styles.hiddenInput}
        />
      </div>
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );

  const renderCropStep = () => (
    <div className={styles.contentWrapper}>
      <div className={styles.cropArea}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              ref={imageRef}
              src={selectedImage}
              alt="Preview"
              className={styles.cropImage}
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`, // Adjust scaling smoothly
                transition: "transform 0.2s ease-in-out", // Add smooth transition for zoom changes
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.controlsWrapper}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label>Zoom: {zoom}%</label>
            <input
              type="range"
              min="100"
              max="200"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))} // Set zoom state directly
            />
          </div>
          <div className={styles.controlGroup}>
            <label>Rotate: {rotation}°</label>
            <input
              type="range"
              min="-180"
              max="180"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))} // Set rotation state directly
            />
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.cropButton} onClick={handleCrop}>
            Crop
          </button>
        </div>
      </div>
    </div>
  );
  

  const renderPreviewStep = () => (
    <div className={styles.contentWrapper}>
      <div className={styles.previewArea}>
        <img src={croppedImage} alt="Preview" />
      </div>
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Profile Image</h2>
        </div>
        <div className={styles.modalBody}>
          {currentStep === 'upload' && renderUploadStep()}
          {currentStep === 'crop' && renderCropStep()}
          {currentStep === 'preview' && renderPreviewStep()}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
