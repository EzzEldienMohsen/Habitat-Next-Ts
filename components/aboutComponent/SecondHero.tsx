import React from 'react'

const SecondHero:React.FC = () => {
  return (
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
      </div>  )
}

export default SecondHero