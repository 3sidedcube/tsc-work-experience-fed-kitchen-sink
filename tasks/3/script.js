(function () {
  const init = () => {
    // Start Here!

    // We are able to fetch data from our API using the "fetch" function
    // Open Task 3 in the browser, open the console, and view the data fetched below
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      // 1) This is a set we must always do!
      .then(response => response.json())
      // 2) This is how we can view our data in the console!
      .then(json => console.log(json));

    // Now try and fetch some data from our API
    // Using https://localhost:300/templates as an example!
    // Make sure to turn it into JSON (Step 1) and then console log it (Step 2)

    // This is how our Website can fetch and read JSON data from our API
  };

  document.addEventListener("DOMContentLoaded", init);
})();
