import React from "react";

import { SearchRecips } from "./SearchRecips"

function App() {
  return (
    <React.Fragment>
      <SearchRecips/>
      <h1>Noticias</h1>
      <SearchIngredients/>
    </React.Fragment>
  )
}

export { App }
