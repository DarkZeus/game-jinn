import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type OptimizedImageProps = {
	src: string;
	alt: string;
	className?: string;
	thumbSrc?: string;
	priority?: boolean;
	onLoad?: () => void;
	onError?: () => void;
};

/**
 * OptimizedImage component with progressive loading and performance optimizations.
 * Features:
 * - Progressive loading: shows blurred thumbnail while full image loads
 * - Lazy loading: only loads when visible (unless priority=true)
 * - Smooth transitions between thumb and full image
 * - Error handling with fallback
 * - Works with or without aspect ratio classes
 */
export const OptimizedImage = ({
	src,
	alt,
	className,
	thumbSrc,
	priority = false,
	onLoad,
	onError,
}: OptimizedImageProps) => {
	const [isFullImageLoaded, setIsFullImageLoaded] = useState(false);
	const [isThumbLoaded, setIsThumbLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isInView, setIsInView] = useState(priority);
	const imgRef = useRef<HTMLDivElement>(null);

	// Intersection Observer for lazy loading
	useEffect(() => {
		if (priority || !imgRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{
				rootMargin: "50px", // Start loading 50px before image comes into view
			},
		);

		observer.observe(imgRef.current);

		return () => observer.disconnect();
	}, [priority]);

	const handleFullImageLoad = () => {
		setIsFullImageLoaded(true);
		onLoad?.();
	};

	const handleError = () => {
		setHasError(true);
		onError?.();
	};

	const shouldShowThumb = thumbSrc && !isFullImageLoaded && !hasError;
	const shouldShowFull = isInView && !hasError;

	return (
		<div ref={imgRef} className={cn("relative", className)}>
			{/* Full resolution image - positioned normally to get intrinsic dimensions */}
			{shouldShowFull && (
				<img
					src={src}
					alt={alt}
					className="w-full h-full object-cover transition-opacity duration-500"
					style={{ opacity: isFullImageLoaded ? 1 : 0 }}
					onLoad={handleFullImageLoad}
					onError={handleError}
					loading={priority ? "eager" : "lazy"}
					decoding="async"
				/>
			)}

			{/* Thumbnail image - absolutely positioned as blur overlay */}
			{shouldShowThumb && (
				<img
					src={thumbSrc}
					alt={alt}
					className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 filter blur-sm scale-110"
					style={{ opacity: isThumbLoaded && !isFullImageLoaded ? 1 : 0 }}
					onLoad={() => setIsThumbLoaded(true)}
					loading="eager"
				/>
			)}

			{/* Loading state fallback */}
			{!isThumbLoaded && !isFullImageLoaded && !hasError && (
				<div className="absolute inset-0 bg-muted animate-pulse" />
			)}

			{/* Error state fallback */}
			{hasError && (
				<div className="absolute inset-0 bg-muted flex items-center justify-center">
					<div className="text-muted-foreground text-sm">Failed to load</div>
				</div>
			)}
		</div>
	);
};
