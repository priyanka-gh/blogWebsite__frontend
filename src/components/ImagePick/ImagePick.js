import React from 'react'
import './ImagePick.css'
import ImageUploading from "react-images-uploading";

const ImagePick = () => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 3;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    return (
    <div className="AppImg">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
        //   onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button className="ImageButton"
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img className="postImage" src={image.data_url} alt="" width="130" height="100%" />
                <div className="image-item__btn-wrapper">
                  <button className="updateImg" onClick={() => onImageUpdate(index)}>Update</button>
                  <button className="remImg" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
    )
}

export default ImagePick
