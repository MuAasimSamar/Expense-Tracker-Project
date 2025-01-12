import { useState } from "react";

export function useFilter(datalist, callback) {
  const [query, setQuery] = useState("");
  const filteredData = datalist.filter((data) => {
    return callback(data).toLowerCase().includes(query); //callback function makes it highly reusable means in this section currently filter based on category if any other componet where i need to filter based on title then i can do it very easily.
  });

  return [filteredData, setQuery];
}
