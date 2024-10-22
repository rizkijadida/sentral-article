import Posts from "../components/Posts";


interface HomeProps {
  searchParams: { [key: string]: string | undefined };
}
export default async function Home({ searchParams }: HomeProps) {
  return (
    <div className="container  m-10">
      <Posts searchParams={searchParams} />
    </div>
  );
}