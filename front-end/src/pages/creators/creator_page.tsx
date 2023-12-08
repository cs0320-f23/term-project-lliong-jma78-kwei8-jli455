import React, { useState } from "react";
import { Creators } from "./creator_contents";
import { Search } from "./creator_search";
import { CreatorProps } from "./single_creator";

export function CreatorPage() {
  const [creators, setCreators] = useState<CreatorProps[]>([]);

  return (
    <div className="spotify-page">
      <Search creators={creators} setCreators={setCreators} />

      <br></br>
      <br></br>
      <div className="spotify-content">
        <div className="right-component">
          <Creators creators={creators} setCreators={setCreators} />
        </div>
      </div>
    </div>
  );
}
