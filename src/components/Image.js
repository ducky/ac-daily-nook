import React, { useEffect, useState } from 'react';

import { IMAGE_NOT_FOUND } from 'constants/strings';

const Image = ({ alt, src, ...props }) => {
  const [url, setUrl] = useState(src);

  useEffect(() => {
    setUrl(src);
  }, [src]);

  const onInvalidImage = () => setUrl(IMAGE_NOT_FOUND);
  return <img alt={alt} src={url} onError={onInvalidImage} {...props} />;
};

export default Image;
