import useMap from "./useMap";

/**
 * Task 6
 */

export function App() {
  const [map, handleShapeFileUpload] = useMap();

  return (
    <div>
      <input type="file" onChange={handleShapeFileUpload} />
    </div>
  );
}
