import {
	getOptimalImageSize,
	getProgressiveImageUrls,
} from "@/lib/utils/image";
import { useEffect, useState } from "react";

/**
 * Hook that provides responsive image URLs that update when window size changes
 */
export const useResponsiveImageUrls = (imageId: string) => {
	const [imageUrls, setImageUrls] = useState(() => {
		const optimalSize = getOptimalImageSize();
		return getProgressiveImageUrls(imageId, optimalSize);
	});

	useEffect(() => {
		const updateImageUrls = () => {
			const optimalSize = getOptimalImageSize();
			setImageUrls(getProgressiveImageUrls(imageId, optimalSize));
		};

		// Update on window resize (debounced)
		let resizeTimeout: number;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(updateImageUrls, 250);
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
			clearTimeout(resizeTimeout);
		};
	}, [imageId]);

	return imageUrls;
};
