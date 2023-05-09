import { createContext } from "react";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiM3NpZGVkY3ViZSIsImEiOiJjbDMwMHZ0MjcwMTczM2Vuc2JhY2xiMjFkIn0.hJaePYnqSne_pJdtJuLhNA";

export const MapContext = createContext(null);

const MapProvider = ({ children }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <MapContext.Provider value={map.current}>
      <div ref={mapContainer} className="map-container" style={{ height: "400px" }} />

      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
