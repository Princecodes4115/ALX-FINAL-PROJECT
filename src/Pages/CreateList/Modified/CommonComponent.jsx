import React, {useState} from 'react'
import UploadImage from './UploadImage'
import CreateListing from './CreateList'

export default function CommonComponent() {
    const [imgUrl, setImgUrl] = useState("");
    
      const handleImgUrlChange = (newImgUrl) => {
        setImgUrl(newImgUrl);
      };
  return (
    <div>
      <UploadImage onImgUrlChange={handleImgUrlChange} />
      <CreateListing imgUrl={imgUrl} />
    </div>
  );
}
