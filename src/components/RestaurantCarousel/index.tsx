import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error in RestaurantCarousel:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="bg-red-50 p-4 rounded-lg text-red-700">Error loading carousel. Please try again later.</div>;
    }

    return this.props.children;
  }
}

type RestaurantImage = {
  src: string;
  alt: string;
};

type RestaurantCarouselProps = {
  images: RestaurantImage[];
  autoPlay?: boolean;
  interval?: number;
};

function RestaurantCarouselComponent({ 
  images, 
  autoPlay = true, 
  interval = 5000 
}: RestaurantCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, autoPlay, interval]);

  if (!images || images.length === 0) {
    return null;
  }

  // Validate images array
  if (!Array.isArray(images) || images.length === 0) {
    console.warn('No valid images provided to RestaurantCarousel');
    return (
      <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700">
        No images available for the carousel
      </div>
    );
  }

  return (
    <div 
      className="relative w-full overflow-hidden rounded-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Restaurant image carousel"
    >
      {/* Main Image */}
      <div className="relative aspect-video w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={classNames(
              'absolute inset-0 transition-opacity duration-1000',
              {
                'opacity-100': index === currentIndex,
                'opacity-0': index !== currentIndex,
              }
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={classNames(
              'h-2 w-2 rounded-full transition-all',
              {
                'w-6 bg-white': index === currentIndex,
                'w-2 bg-white/50': index !== currentIndex,
              }
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
          ))}
        </div>
      )}
    </div>
  );
}

// Wrap the component with ErrorBoundary
export default function RestaurantCarousel(props: RestaurantCarouselProps) {
  return (
    <ErrorBoundary>
      <RestaurantCarouselComponent {...props} />
    </ErrorBoundary>
  );
}
