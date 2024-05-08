import { Suspense } from 'react'
import Card from "@/Components/Card/Card";
import Loader from "@/Components/Loader";

export default function Grid({ stones }) {
  const { data } = stones;
  return (
    <div className="container mx-auto px-4 items-center justify-center "> {/* Añade un contenedor con centrado automático y padding */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center my-5">
        {data.map((stone) => (
          <Suspense fallack={<Loader />}>
            <Card key={stone.id} stone={stone} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};
