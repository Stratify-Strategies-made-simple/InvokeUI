import React, { useState } from 'react';

const Avatar = ({ src, alt, className, fallbackName, size = 32 }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    if (!hasError) {
      console.error("Avatar image failed to load:", e.target.src);
      setHasError(true);
      
      // Try fallback avatar services in order
      if (e.target.src.includes('dicebear.com')) {
        // Fallback to UI-Avatars
        const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName || 'User')}&background=6366f1&color=fff&size=${size}`;
        console.log("Trying UI-Avatars fallback:", fallbackUrl);
        setImgSrc(fallbackUrl);
      } else if (e.target.src.includes('ui-avatars.com')) {
        // Final fallback to a simple SVG
        const svgFallback = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%236366f1'/%3E%3Ctext x='16' y='20' text-anchor='middle' fill='white' font-family='Arial' font-size='12' font-weight='bold'%3E${(fallbackName || 'U').charAt(0).toUpperCase()}%3C/text%3E%3C/svg%3E`;
        console.log("Using SVG fallback");
        setImgSrc(svgFallback);
      }
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={() => console.log("Avatar loaded successfully:", imgSrc)}
    />
  );
};

export default Avatar;
