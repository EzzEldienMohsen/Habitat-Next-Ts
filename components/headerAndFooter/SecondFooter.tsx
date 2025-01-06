
const SecondFooter = () => {
  return (
    <div className="bg-[#000] my-2 flex flex-col md:flex-row-reverse px-2 gap-4 py-6 md:px-4 lg:px-6 justify-start lg:justify-between">
      <div className="flex flex-col md:flex-row justify-evenly w-1/2 gap-4">
          <h2 className="text-[#F5F5F5B2] font-man font-bold capitalize">
            privacy Policy
          </h2>
          <h2 className="text-[#F5F5F5B2] font-man font-bold capitalize">
            terms of services
          </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-1/2 gap-4">
        <h6 className="text-[white] text-sm font-man font-bold capitalize">
          © 2022 Habitat Scapes, LLC
        </h6>
        <h6 className="text-[white] text-sm font-man font-bold capitalize">
          Crafted with ♥️ by HighNorth
        </h6>
      </div>
    </div>
  );
}

export default SecondFooter