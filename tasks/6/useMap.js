import { useContext } from "react";
import { MapContext } from "./MapProvider";
import turf from "@turf/turf";

const useMap = () => {
  const map = useContext(MapContext);

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
      // const geojsonParsed = geoJSON.features.reduce(turf.union);

      console.log(geoJSON);
    } else {
      console.warn("File Too Large");
    }
  };

  return [map, handleShapeFileUpload];
};

export default useMap;
