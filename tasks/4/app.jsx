import { useEffect, useState } from "react";

/**
 * Task 4
 */

export function App() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Put your API call here, and update the state
    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    //   // 1) This is a set we must always do!
    //   .then(response => response.json())
    //   // 2) This is how we can view our data in the console!
    //   .then(json => setTemplates(json));
  });

  // Try and styling the HTML using Bootstrap components
  return (
    <>
      {templates?.map(template => (
        <div>
          <h1>{template.name}</h1>
          <h2>Questions</h2>
          <ul>
            {template.questions.map(question => (
              <li>{question.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
