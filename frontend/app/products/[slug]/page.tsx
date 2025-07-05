import { use } from "react";

type productPage = {
  params: Promise<{ slug: string }>;
};

export default function page({ params }: productPage) {
  const slug = use(params);
  console.log(slug);

  return (
    <div>
      <p>{slug.slug}</p>
    </div>
  );
}
