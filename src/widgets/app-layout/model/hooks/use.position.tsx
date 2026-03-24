import { Transition, TargetAndTransition } from "framer-motion";
import { TypePosition } from "../types/type.position";

interface IResponse {
  contentPosition: string;
  textPosition: string;
  initialX: string;
  gradient: string;
  animation: {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    transition: Transition;
  };
}

export const usePosition = (position: TypePosition): IResponse => {
  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "left-0 border-r";
      case "center":
        return "left-1/2 -translate-x-1/2 border-x";
      case "right":
        return "right-0 border-l";
      default:
        return "right-0 border-l";
    }
  };

  const getInitialX = () => {
    switch (position) {
      case "left":
        return "-100%";
      case "center":
        return "0";
      case "right":
        return "100%";
      default:
        return "100%";
    }
  };

  const getTextPositionClasses = () => {
    switch (position) {
      case "left":
        return "right-20 text-right";
      case "center":
        return "left-20 text-left";
      case "right":
        return "left-20 text-left";
      default:
        return "left-20 text-left";
    }
  };

  const getGradientDirection = () => {
    switch (position) {
      case "left":
        return "to-r";
      case "center":
        return "to-l";
      case "right":
        return "to-l";
      default:
        return "to-l";
    }
  };

  const getAnimationProps = () => {
    switch (position) {
      case "left":
        return {
          initial: { x: -500, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
          } as Transition,
        };
      case "right":
        return {
          initial: { x: 500, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
          } as Transition,
        };
      case "center":
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: {
            duration: 0.3,
            ease: "easeOut",
          } as Transition,
        };
      default:
        return {
          initial: { x: "100%", opacity: 0 },
          animate: { x: 0, opacity: 1 },
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
          } as Transition,
        };
    }
  };

  const animationProps = getAnimationProps();

  return {
    contentPosition: getPositionClasses(),
    textPosition: getTextPositionClasses(),
    gradient: getGradientDirection(),
    initialX: getInitialX(),
    animation: {
      initial: animationProps.initial,
      animate: animationProps.animate,
      transition: animationProps.transition,
    },
  };
};
