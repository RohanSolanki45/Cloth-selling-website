import React from 'react'
import Products from './Products'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Navbar from './Navbar';
import Footer from './Footer';
const items = [
    <img className='cursor-pointer -z-10' role='presentation' src="https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/5/_/5_8.jpg" alt="" />,
    <img className='cursor-pointer -z-10' role='presentation' src="https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/4/_/4_9.jpg" alt="" />,
    <img className='cursor-pointer -z-10' role='presentation' src="https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/2/_/2_10.jpg" alt="" />,
    <img className='cursor-pointer -z-10' role='presentation' src="https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/3/_/3_10.jpg" alt="" />,
];
function Home() {
    return (
        <>
    <Navbar />
        <div className='continer-fluid'>
    <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000}
        infinite
    />
            <Products/>
        </div >
        <Footer/>
        </>
    )
}

export default Home