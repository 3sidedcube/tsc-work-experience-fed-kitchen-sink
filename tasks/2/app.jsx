import { useState } from "react";

/**
 * Task 2
 */

export function App() {
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    // Submit some data to an API here!
    // https://jsonplaceholder.typicode.com/posts
    // POST { title: title }
    console.log(title);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
