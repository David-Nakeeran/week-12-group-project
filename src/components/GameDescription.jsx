"use client";
//Doing this due to a hydration error
export default function GameDescription({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
