import { useContext } from "react";
import { ShapeFileContext } from "./MapProvider";

const useShapeFile = () => {
  return useContext(ShapeFileContext);
};

export default useShapeFile;
