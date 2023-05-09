import useShapeFile from "./useShapeFile.js";

/**
 * Task 4
 */

export function App() {
  const shapeFile = useShapeFile();

  const handleSubmit = e => {
    e.preventDefault();

    // Submit the Area Data here to the API
    console.log(shapeFile);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Can you create a Form with a Name field, so that we can submit an Area to our API? */}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
