import { TypePosition } from "../types/type.position";

interface IResponse {
  contentPosition: string;
  textPosition: string;
  initialX: string;
  gradient: string;
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

  return {
    contentPosition: getPositionClasses(),
    textPosition: getTextPositionClasses(),
    gradient: getGradientDirection(),
    initialX: getInitialX(),
  };
};
