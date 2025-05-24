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

	// Check if className contains aspect ratio - if not, provide a fallback
	const hasAspectRatio = className?.includes("aspect-");
	const hasFixedHeight = className?.includes("h-");
	const containerClass = cn(
		"relative overflow-hidden",
		hasAspectRatio || hasFixedHeight
			? className
			: cn("min-h-[200px] w-full", className), // Fallback dimensions
	);

	return (
		<div ref={imgRef} className={containerClass}>
			{/* Thumbnail image - blurred placeholder */}
			{shouldShowThumb && (
				<img
					src={thumbSrc}
					alt={alt}
					className={cn(
						"absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
						"filter blur-sm scale-110", // Blur and slightly scale to hide blur edges
						isThumbLoaded ? "opacity-100" : "opacity-0",
					)}
					onLoad={() => setIsThumbLoaded(true)}
					loading="eager" // Load thumb immediately
					style={{ objectFit: "cover" }} // Ensure cover behavior
				/>
			)}

			{/* Full resolution image */}
			{shouldShowFull && (
				<img
					src={src}
					alt={alt}
					className={cn(
						"absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
						isFullImageLoaded ? "opacity-100" : "opacity-0",
					)}
					onLoad={handleFullImageLoad}
					onError={handleError}
					loading={priority ? "eager" : "lazy"}
					decoding="async"
					style={{ objectFit: "cover" }} // Ensure cover behavior
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
