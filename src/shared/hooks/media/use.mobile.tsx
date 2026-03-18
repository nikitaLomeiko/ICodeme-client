import { useMediaQuery } from "./general/use.media.query";

export const useMobile = (): boolean => {
  return useMediaQuery("(max-width: 767px)");
};
