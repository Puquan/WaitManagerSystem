import React from "react";
import Sortable from "./Sortable";

export default function App() {
  const [list, setList] = React.useState(() =>
    [1, 2, 3, 4, 5].map((v) => ({
      key: v,
      children: `Item ${v}`
    }))
  );

  return (
    <div className="App">
      <h1>Sortable</h1>
      <Sortable list={list} setList={setList}></Sortable>
    </div>
  );
}