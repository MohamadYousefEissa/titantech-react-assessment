import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./ImagesCarousel.module.css";
import Autoplay from "embla-carousel-autoplay";

type PropType = {
  slides: string[];
};

export const ProductImagesCarousel = ({ slides }: PropType) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(),
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    setTimeout(() => {
      onSelect();
    });

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
    emblaMainApi.plugins().autoplay?.play();
  }, [emblaMainApi, onSelect]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaMainRef}>
        <div className={styles.embla__container}>
          {slides.map((img, index) => (
            <div className={styles.embla__slide} key={index}>
              <img
                src={img}
                alt="product image"
                className="aspect-square size-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles["embla-thumbs"]}>
        <div className={styles["embla-thumbs__viewport"]} ref={emblaThumbsRef}>
          <div className={styles["embla-thumbs__container"]}>
            {slides.map((img, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={index}
                  className={`border rounded-2xl transition-colors duration-200 ${isSelected ? "border-primary" : " border-black/10 dark:border-white/10"}`}
                >
                  <img
                    src={img}
                    alt="product image"
                    onClick={() => onThumbClick(index)}
                    className="size-20 min-w-20"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
