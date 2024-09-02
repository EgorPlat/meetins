import React, { useRef, useEffect } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import s from "./CropImage.module.scss";

interface IImageCropperProps {
    handleGetCropperImageBlob: (blob: Blob) => void,
    imageForCrop: string,
};

const ImageCropper = ({
    handleGetCropperImageBlob,
    imageForCrop
}: IImageCropperProps) => {

    const imageRef = useRef(null);
    const cropperRef = useRef<Cropper>(null);

    const handleSaveCroppedImage = () => {
        cropperRef.current.getCroppedCanvas().toBlob((blob: Blob) => {
            handleGetCropperImageBlob(blob);   
        })
    };

    useEffect(() => {
        if (imageRef.current) {
            cropperRef.current = new Cropper(imageRef.current, {
                viewMode: 1,
                guides: false,
                movable: true,
                zoomable: false,
                cropBoxMovable: true,
                cropBoxResizable: true,
                minCropBoxHeight: 150,
                minCropBoxWidth: 150,
            });
        }

        return () => {
            if (cropperRef.current) {
                cropperRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className={s.cropperContent}>
            <div className={s.cropImage}>
                <img ref={imageRef} src={imageForCrop} />
            </div>
            <button onClick={handleSaveCroppedImage}>Сохранить изображение</button>
        </div>
    );
};

export default ImageCropper;