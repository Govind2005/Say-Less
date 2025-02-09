import {Hero,SearchBar,CustomFilter} from "@/components";

export default function Home() {
  return (
    <main className="overflow-hidden ">
      <Hero/>
      <div className="mt-12 p-16 max-width bg-yellow-50" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">
            Menu
          </h1>
          <p>Look through the delicous cakes</p>
        </div>

        <div className="home__filters">
          <SearchBar/>
          <div className="home__fitler-container">
            {/* <CustomFilter title="name"/> */}
            {/* <CustomFilter title="price"/> */}
          </div>
        </div>
      </div>
    </main>
  );
}
