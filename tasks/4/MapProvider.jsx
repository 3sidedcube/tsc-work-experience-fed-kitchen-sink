import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import { createContext, useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiM3NpZGVkY3ViZSIsImEiOiJjbDMwMHZ0MjcwMTczM2Vuc2JhY2xiMjFkIn0.hJaePYnqSne_pJdtJuLhNA";

export const ShapeFileContext = createContext(null);

const MapProvider = ({ children }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-1.87);
  const [lat, setLat] = useState(50.72);
  const [zoom, setZoom] = useState(12);
  const fileInput = useRef();

  // API Safe ShapeFile
  const [shapeFile, setShapeFile] = useState([]);

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

  const handleShapeFileUpload = async e => {
    const shapeFile = e.target.files && e.target.files[0];
    const maxFileSize = 1000000; //1MB

    if (shapeFile && shapeFile.size <= maxFileSize) {
      const url = `https://staging-api.resourcewatch.org/v1/ogr/convert`;

      const body = new FormData();
      body.append("file", shapeFile);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzM0ZGFlODgwNDQ1MDAxYTQ2YzQ5NCIsInJvbGUiOiJVU0VSIiwicHJvdmlkZXIiOiJsb2NhbCIsImVtYWlsIjoib3dlbkAzc2lkZWRjdWJlLmNvbSIsImV4dHJhVXNlckRhdGEiOnsiYXBwcyI6W119LCJjcmVhdGVkQXQiOjE2ODAxOTMwMTUyODksIm5hbWUiOiJvd2VuIiwiaWF0IjoxNjgwMTkzMDE1fQ.H0A8kFRIMu5uAq4n51Xyz_1iqZ_4q-ZflWq5GL4Rwe4"
        },
        body
      });

      const geoJSON = await response.json();

      // https://turfjs.org/docs/#union
      const geojsonFeatures = geoJSON.data.attributes.features.reduce(turf.union);

      handleClear();

      setShapeFile(turf.coordAll(geojsonFeatures).map(coord => ({ lon: coord[0], lat: coord[1] })));

      // Add a data source containing GeoJSON data.
      map.current.addSource("area", {
        type: "geojson",
        data: geojsonFeatures
      });

      // Add a new layer to visualize the polygon.
      map.current.addLayer({
        id: "area",
        type: "fill",
        source: "area", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.5
        }
      });

      // Add a black outline around the polygon.
      map.current.addLayer({
        id: "area-outline",
        type: "line",
        source: "area",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 3
        }
      });

      // Fly to that new location
      map.current.flyTo({
        zoom: 12,
        center: turf.getCoord(turf.centerOfMass(geojsonFeatures)),
        essential: true
      });
    } else {
      console.warn("File Too Large");
    }
  };

  const handleClear = () => {
    if (map.current.getLayer("area")) map.current.removeLayer("area");
    if (map.current.getLayer("area-outline")) map.current.removeLayer("area-outline");

    if (map.current.getSource("area")) map.current.removeSource("area");

    setShapeFile([]);
  };

  return (
    <ShapeFileContext.Provider value={shapeFile}>
      <div ref={mapContainer} className="map-container" style={{ height: "600px" }} />

      <div className="input-group my-3">
        <input className="form-control" type="file" ref={fileInput} onChange={handleShapeFileUpload} />

        <button
          className="input-group-text btn btn-danger"
          onClick={() => {
            fileInput.current.value = null;
            handleClear();
          }}
        >
          Clear
        </button>
      </div>

      {children}
    </ShapeFileContext.Provider>
  );
};

export default MapProvider;
