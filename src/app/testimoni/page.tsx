import Testimonix from "./components/Testimonix";

interface TestimoniProps {
  searchParams: { [key: string]: string | undefined };
}
export default async function Testimoni({ searchParams }: TestimoniProps) {
  return (
    <div className="container m-10 grid items-center text-center mx-auto justify-center">
      <Testimonix searchParams={searchParams} />
    </div>
  );
}
