import React from 'react';
export default function StoriesPage() {
  const ReportHandler = () => {
    
    
   const url= 'https://images.app.goo.gl/wj2Yxfn5UF39yLhB9';
    window.location.href = url;
  }
  return (
  <>
    <section className='bg-gray-100 m-10 shadow-2xl rounded-2xl p-10'>
      <h1 className='text-center pt-10 text-5xl font-bold text-[#2E003E] mb-10'>Survivor Stories</h1>
      <div className='flex space-x-3'>
      <img src="/images/news_6.png" alt=""  />
      <img src="/images/news_7.png" alt="" className='h-[500px] mt-5'/>
      <img src="/images/news_8.png" alt=""  className='h-[500px]'/>
      </div>
      <div className='flex space-x-3 justify-end'>
       <img src="/images/news_3.jpg" alt=""  className='h-[400px]'/>
        <img src="/images/news_11.webp" alt=""  className='h-[400px]'/>
        </div>
        <div className='flex space-x-3'>
        <img src="/images/news_9.png" alt="" className='h-[400px] ' />
        <img src="/images/news_10.webp" alt="" className='h-[400px] ' />
        </div>
    </section>
    
    <div className="flex justify-center mt-8 mb-10">
  <button onClick={ReportHandler} className="text-white px-10 py-4 bg-[#6A0DAD] rounded-full font-semibold shadow-lg hover:bg-[#5e0c9f] transition duration-300 " id='reportHandler'> More Reports <i className="fa-solid fa-arrow-right-long"></i>
  </button>
</div>


    </>
  );
}