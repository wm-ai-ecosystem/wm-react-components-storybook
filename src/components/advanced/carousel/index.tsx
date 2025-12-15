import React, {
  HtmlHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import clsx from "clsx";

import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmCarouselProps from "./props";
import { isObject, isPlainObject } from "lodash-es";

const DEFAULT_CLASS = "app-carousel carousel";

interface StyledCarouselProps {
  ownerState: {
    height?: string | number;
    width?: string | number;
    isAnimating: boolean;
  };
}

const StyledCarousel = styled(Box, {
  shouldForwardProp: prop => !["ownerState"].includes(prop as string),
})<StyledCarouselProps>(({ ownerState }) => {
  const { height, width, isAnimating } = ownerState;

  return {
    position: "relative",
    width: width || "100%",
    height: height || "480px",
    overflow: "hidden",

    "& .carousel-inner": {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },

    "& .carousel-item": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 1,
      transition: isAnimating ? "transform 0.6s ease-in-out" : "none",
      transform: "translate3d(0, 0, 0)",
      WebkitTransform: "translate3d(0, 0, 0)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "&.active": {
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        zIndex: 2,
      },

      "&.carousel-item-left": {
        transform: "translate3d(-100%, 0, 0)",
        WebkitTransform: "translate3d(-100%, 0, 0)",
        zIndex: 1,
      },

      "&.carousel-item-right": {
        transform: "translate3d(100%, 0, 0)",
        WebkitTransform: "translate3d(100%, 0, 0)",
        zIndex: 1,
      },

      "&.carousel-item-prev": {
        transform: "translate3d(-100%, 0, 0)",
        WebkitTransform: "translate3d(-100%, 0, 0)",
        zIndex: 1,

        "&.carousel-item-left": {
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          zIndex: 2,
        },
      },

      "&.carousel-item-next": {
        transform: "translate3d(100%, 0, 0)",
        WebkitTransform: "translate3d(100%, 0, 0)",
        zIndex: 1,

        "&.carousel-item-right": {
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          zIndex: 2,
        },
      },

      // Special handling for active items during animation
      "&.active.carousel-item-left": {
        transform: "translate3d(-100%, 0, 0)",
        WebkitTransform: "translate3d(-100%, 0, 0)",
        zIndex: 1,
      },

      "&.active.carousel-item-right": {
        transform: "translate3d(100%, 0, 0)",
        WebkitTransform: "translate3d(100%, 0, 0)",
        zIndex: 1,
      },
    },

    // Navigation controls
    "& .carousel-control": {
      zIndex: 5,
      height: "inherit",
    },

    // Hide controls based on controls prop
    "&.hide-navs .carousel-control": {
      display: "none",
    },

    "&.hide-indicators .carousel-indicators": {
      display: "none",
    },

    "&.hide-both .carousel-control, &.hide-both .carousel-indicators": {
      display: "none",
    },
  };
});

const WmCarousel = memo(
  (props: WmCarouselProps) => {
    const {
      name,
      animation = "auto",
      animationinterval = 3,
      controls = "both",
      nodatamessage = "No Data Found",
      height = "480px",
      width = "100%",
      children,
      className,
      styles,
      render,
      onChange,
      ...rest
    } = props;
    let dataset = props.dataset || [];
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [prevActiveIndex, setPrevActiveIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const carouselRef = useRef<HTMLDivElement>(null);
    dataset = isPlainObject(dataset) ? [dataset] : dataset;

    // Determine if it's a dynamic carousel (has dataset) or static (has children)
    const isDynamic = dataset && dataset.length > 0;
    const items = isDynamic ? dataset : React.Children.toArray(children || []);

    const itemCount = items.length;

    const ownerState = useMemo(
      () => ({
        height,
        width,
        isAnimating,
      }),
      [height, width, isAnimating]
    );

    // Auto-play functionality
    const startAutoPlay = useCallback(() => {
      if (animation === "auto" && animationinterval > 0 && itemCount > 1) {
        intervalRef.current = setInterval(() => {
          if (!isPaused) {
            setActiveIndex((prevIndex: number) => {
              const newIndex = (prevIndex + 1) % itemCount;
              setDirection("right");
              setPrevActiveIndex(prevIndex);
              setIsAnimating(true);
              setTimeout(() => setIsAnimating(false), 600);
              return newIndex;
            });
          }
        }, animationinterval * 1000);
      }
    }, [animation, animationinterval, itemCount, isPaused]);

    const stopAutoPlay = useCallback(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    }, []);

    // Start/stop auto-play based on props
    useEffect(() => {
      if (animation === "auto" && !isPaused) {
        startAutoPlay();
      } else {
        stopAutoPlay();
      }

      return () => stopAutoPlay();
    }, [animation, startAutoPlay, stopAutoPlay, isPaused]);

    // Navigation functions
    const goToSlide = useCallback(
      (index: number, slideDirection?: "left" | "right") => {
        if (index >= 0 && index < itemCount && index !== activeIndex) {
          setIsAnimating(true);
          const oldIndex = activeIndex;

          // Determine slide direction
          let dir = slideDirection;
          if (!dir) {
            // Handle circular navigation properly
            if (index === 0 && activeIndex === itemCount - 1) {
              dir = "right"; // Last to first
            } else if (index === itemCount - 1 && activeIndex === 0) {
              dir = "left"; // First to last
            } else if (index > activeIndex) {
              dir = "right";
            } else {
              dir = "left";
            }
          }

          setDirection(dir);
          setPrevActiveIndex(activeIndex);

          // Set new active index
          setActiveIndex(index);

          // Call onChange callback
          onChange?.(null, props, index, oldIndex);

          // Reset animation state after transition
          setTimeout(() => setIsAnimating(false), 600);
        }
      },
      [activeIndex, itemCount, onChange, props]
    );

    const goToPrevious = useCallback(() => {
      const newIndex = activeIndex === 0 ? itemCount - 1 : activeIndex - 1;
      goToSlide(newIndex, "left");
    }, [activeIndex, itemCount, goToSlide]);

    const goToNext = useCallback(() => {
      const newIndex = (activeIndex + 1) % itemCount;
      goToSlide(newIndex, "right");
    }, [activeIndex, itemCount, goToSlide]);

    // Mouse event handlers for pause/resume
    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setIsPaused(true);
        props.onMouseEnter?.(event, props);
      },
      [props]
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setIsPaused(false);
        props.onMouseLeave?.(event, props);
      },
      [props]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        props.onClick?.(event, props);
      },
      [props]
    );

    const handleDoubleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        props.onDoubleClick?.(event, props);
      },
      [props]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault();
            goToPrevious();
            break;
          case "ArrowRight":
            event.preventDefault();
            goToNext();
            break;
          case " ": // Space key
            event.preventDefault();
            setIsPaused(prev => !prev);
            break;
        }
      },
      [goToPrevious, goToNext]
    );

    // Get navigation class based on controls prop
    const getNavigationClass = () => {
      switch (controls) {
        case "indicators":
          return "hide-navs";
        case "navs":
          return "hide-indicators";
        case "none":
          return "hide-both";
        default:
          return "";
      }
    };

    // Render carousel items
    const renderCarouselItems = () => {
      if (itemCount === 0) {
        return (
          <div className="carousel-item active">
            <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
              {nodatamessage}
            </Typography>
          </div>
        );
      }

      return items.map((item, index) => {
        const isActive = index === activeIndex;
        const isPrevious = index === prevActiveIndex;

        const getItemClasses = () => {
          let classes = "carousel-item";

          if (isActive && !isAnimating) {
            classes += " active";
          } else if (isAnimating) {
            if (isActive) {
              // New active item coming in
              if (direction === "left") {
                classes += " carousel-item-prev carousel-item-left";
              } else {
                classes += " carousel-item-next carousel-item-right";
              }
            } else if (isPrevious) {
              // Previous active item going out
              if (direction === "left") {
                classes += " active carousel-item-right";
              } else {
                classes += " active carousel-item-left";
              }
            } else {
              // Position other items off-screen
              if (index < activeIndex) {
                classes += " carousel-item-left";
              } else {
                classes += " carousel-item-right";
              }
            }
          } else {
            // Default positioning when not animating
            if (isActive) {
              classes += " active";
            } else if (index < activeIndex) {
              classes += " carousel-item-left";
            } else if (index > activeIndex) {
              classes += " carousel-item-right";
            }
          }

          return classes;
        };

        return (
          <div
            key={index}
            className={getItemClasses()}
            aria-hidden={index !== activeIndex && !isAnimating}
          >
            {isDynamic && render ? render(item, index) : item}
          </div>
        );
      });
    };

    // Render navigation controls
    const renderNavControls = () => {
      if (controls === "indicators" || controls === "none") return null;

      return (
        <>
          <div
            aria-disabled={itemCount <= 1}
            className="left carousel-control carousel-control-prev app-anchor"
            tabIndex={0}
            onClick={goToPrevious}
            aria-label={`${activeIndex + 1} of ${itemCount}`}
            {...({ name: name } as HtmlHTMLAttributes<HTMLDivElement>)}
            {...({ disabled: itemCount <= 1 } as HtmlHTMLAttributes<HTMLDivElement>)}
          >
            <span aria-hidden="true" className="icon-prev carousel-control-prev-icon"></span>
          </div>
          <div
            aria-disabled={itemCount <= 1}
            className="right carousel-control carousel-control-next app-anchor"
            tabIndex={0}
            onClick={goToNext}
            aria-label="Next slide"
            {...({ name: name } as HtmlHTMLAttributes<HTMLDivElement>)}
            {...({ disabled: itemCount <= 1 } as HtmlHTMLAttributes<HTMLDivElement>)}
          >
            <span aria-hidden="true" className="icon-next carousel-control-next-icon"></span>
          </div>
        </>
      );
    };

    // Render indicators
    const renderIndicators = () => {
      if (controls === "navs" || controls === "none" || itemCount <= 1) return null;

      return (
        <ul className="carousel-indicators" role="tablist">
          {items.map((_, index) => (
            <li
              key={index}
              className={clsx({ active: index === activeIndex })}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-label={`Slide ${index + 1}`}
              aria-selected={index === activeIndex}
            />
          ))}
        </ul>
      );
    };

    return (
      <StyledCarousel
        ref={carouselRef}
        ownerState={ownerState}
        className={clsx(DEFAULT_CLASS, getNavigationClass(), props.className)}
        sx={props.styles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        tabIndex={props.tabindex || 0}
        role="region"
        aria-label={props.arialabel || "Carousel"}
        aria-live={animation === "auto" ? "polite" : "off"}
        {...rest}
      >
        <div className="carousel slide" style={{ ...styles }}>
          <div className="carousel-inner" role="group">
            {renderCarouselItems()}
          </div>
          {renderNavControls()}
          {renderIndicators()}
        </div>
      </StyledCarousel>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for memoization
    const keysToCompare: (keyof WmCarouselProps)[] = [
      "dataset",
      "animation",
      "animationinterval",
      "controls",
      "children",
      "className",
      "styles",
    ];

    return keysToCompare.every(key => {
      if (key === "dataset") {
        return JSON.stringify(prevProps[key]) === JSON.stringify(nextProps[key]);
      }
      return prevProps[key] === nextProps[key];
    });
  }
);

WmCarousel.displayName = "WmCarousel";

export default withBaseWrapper(WmCarousel);
