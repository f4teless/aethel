"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 80,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  sizes,
  fallbackSrc,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageError, setImageError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setImageError(false);
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && !imageError) {
      setImageSrc(fallbackSrc);
      setImageError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={loading}
        sizes={sizes}
        onError={handleError}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}

// Utility function to generate blur data URL for better loading experience
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
    </svg>`
  ).toString('base64')}`;
}
