import React from 'react';

const Hero = () => {
  return (
    <div className="bg-[white] flex flex-col">
      {/* First Part */}
      <div className="my-8 flex flex-col">
        <h1 className=" px-4 font-man capitalize text-xl md:text-2xl lg:text-3xl font-light text-[#1b1b1b]">
          Tank & Hardscape Accessories
        </h1>
        <p className="px-4 my-3 w-5/6 lg:w-3/5 font-man capitalize text-md md:text-lg lg:text-xl">
          Quality hand-picked and unique freshwater aquarium-friendly natural
          rocks, stones, and wood of all different shapes and sizes, and
          textures.
        </p>
      </div>
      {/* Second Part */}
      <div className=" bg-[#f7f5eb] flex flex-col py-4">
        <h1 className="  px-4 font-man capitalize text-xl md:text-2xl lg:text-3xl font-light ">
          About Us
        </h1>
        <div className="flex flex-col md:flex-row-reverse md:justify-between md:items-center">
          <img
            src="https://assets-global.website-files.com/62b5e26a99a06f072c51d127/62b661031ffc4dc545a3cf55_crypt-large.jpg"
            alt="image"
            className="w-96 h-96 lg:w-2/5 "
          />
          <p className="px-4 my-3 md:w-3/5 lg:w-1/2 leading-4 space-y-4 font-man capitalize text-md md:text-lg lg:text-xl ">
            we are specialized in all that is needed for alchemy nad
            blacksmithing. name it we have it, here you will find rocks,
            gemstones,soil and roots as well as a lot of Accessories. Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Aut quas harum
            possimus placeat corrupti natus minima, ipsa veniam ducimus error
            consectetur quidem magni magnam, ut tempore voluptas? Accusamus in
            perferendis fuga molestias, error nam animi assumenda hic. Numquam
            aliquid, sunt enim labore quidem unde nisi est earum eaque, nihil
            magni?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
