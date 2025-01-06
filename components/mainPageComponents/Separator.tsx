import React from 'react';
import Image from 'next/image';

const Separator: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxHeight: '40vh', // Ensures the image respects the height constraint
        height: '40vh', // Required for the `fill` layout to work
      }}
    >
      <Image
        src="https://assets-global.website-files.com/62b5e26a99a06f072c51d127/62b6639ce863641c1318084d_baby-fry-divider.jpg"
        alt="Separator Image"
        style={{ objectFit: 'cover' }}
        sizes="100vw"
        fill
        priority={false} // Use priority if it's critical for the page load
        placeholder="empty"
        quality={100} // Adjust quality as per your need
      />
    </div>
  );
};

export default Separator;
