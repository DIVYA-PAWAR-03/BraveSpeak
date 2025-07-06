import React from 'react';

export default function StoriesPage() {
  const ReportHandler = () => {
    const url = 'https://images.app.goo.gl/wj2Yxfn5UF39yLhB9';
    window.location.href = url;
  };

  return (
    <>
      <section className='bg-gray-100 m-4 md:m-10 shadow-2xl rounded-2xl p-6 md:p-10'>
        <h1 className='text-center pt-6 md:pt-10 text-3xl md:text-5xl font-bold text-[#2E003E] mb-8 md:mb-10'>
          Survivor Stories
        </h1>

        {/* Row 1 */}
        <div className='flex flex-col md:flex-row justify-center gap-4'>
          <img src="images/news_6.png" alt="" className='w-full md:w-auto h-auto md:h-[500px] rounded-xl' />
          <img src="images/news_7.png" alt="" className='w-full md:w-auto h-auto md:h-[500px] mt-0 md:mt-6 rounded-xl' />
          <img src="images/news_8.png" alt="" className='w-full md:w-auto h-auto md:h-[500px] rounded-xl' />
        </div>

        {/* Row 2 */}
        <div className='flex flex-col md:flex-row justify-center gap-4 mt-5'>
          <img src="images/news_9.png" alt="" className='w-full md:w-auto h-auto md:h-[350px] rounded-xl' />
          <img src="images/news_11.webp" alt="" className='w-full md:w-auto h-auto md:h-[350px] rounded-xl' />
          <img src="images/news_3.jpg" alt="" className='w-full md:w-auto h-auto md:h-[350px] rounded-xl' />
        </div>

        {/* Row 3 */}
        <div className='flex flex-col md:flex-row justify-end gap-4 mt-5'>
          <img src="images/news_10.webp" alt="" className='w-full md:w-auto h-auto md:h-[300px] rounded-xl' />
          <img src="images/news_4.jpeg" alt="" className='w-full md:w-auto h-auto md:h-[250px] rounded-xl' />
        </div>
      </section>

      {/* Button */}
      <div className="flex justify-center mt-8 mb-10">
        <button
          onClick={ReportHandler}
          className="text-white px-8 py-3 md:px-10 md:py-4 bg-[#6A0DAD] rounded-full font-semibold shadow-lg hover:bg-[#5e0c9f] transition duration-300"
          id='reportHandler'
        >
          More Reports <i className="fa-solid fa-arrow-right-long ml-2"></i>
        </button>
      </div>
    </>
  );
}
