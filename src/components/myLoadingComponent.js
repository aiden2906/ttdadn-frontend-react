import React from "react";
import {Spinner} from 'react-bootstrap'

export default function MyLoadingComponent({ isLoading, error }) {
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else if (error) {
    return <div>Error...</div>;
  } else {
    return null;
  }
}
