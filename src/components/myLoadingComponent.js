import React from 'react'

export default function MyLoadingComponent({isLoading, error}){
  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if (error) {
    return <div>Error...</div>;
  }
  else {
    return null;
  }
};