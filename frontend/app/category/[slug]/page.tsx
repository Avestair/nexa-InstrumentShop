import React, { use } from "react";

export default function page({ params }) {
  const { slug } = use(params);
  return (
    <div>
      <div>{slug}</div>
    </div>
  );
}
