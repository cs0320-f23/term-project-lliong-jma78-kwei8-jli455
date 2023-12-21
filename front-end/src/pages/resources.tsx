import React from "react";
import { Link } from "react-router-dom";

// should I underline links?
// resources on getting funding? business related resources, general AAPI resources
export default function Resources() {
  return (
    <div className="resources">
      <h2>Resources for Business Owners:</h2>
      <Link to="https://www.sba.gov/" target="_blank">U.S. Small Business Administration</Link>
      <br></br>
      <Link to="https://www.aabdc.com/" target="_blank">Asian American Business Development Center</Link>
      <h2>Find more resources in your area here:</h2>
      <Link to="https://asianresourcehub.org/resources/" target="_blank">Asian Resource Hub</Link>
    </div>
  );
}
