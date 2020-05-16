import React from "react";
import Image from "react-shimmer";

import { Spinner } from "./Spinner";

export default function App() {
  return (
    <div>
      <Image
        src={"https://source.unsplash.com/random"}
        fallback={<Spinner />}
      />
    </div>
  );
}
