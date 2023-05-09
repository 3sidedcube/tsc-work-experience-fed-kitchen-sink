import { useState } from "react";

/**
 * Task 5
 */

export function App() {
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    // Submit the Data to the API here
    console.log(title);
  };

  // Try and build a Form for all the data we need to submit a Template
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Template Title
        </label>
        <input className="form-control" id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
