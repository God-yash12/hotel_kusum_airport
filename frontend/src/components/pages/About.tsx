import { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import Image1 from '@/assets/carousel1.jpg';
import Image2 from '@/assets/carousel2.png';
import Image3 from '@/assets/footer.png';



const StyledWrapper = styled.div`
  .txt {
    position: relative;
    font-family: sans-serif;
    font-size: 2em;
    letter-spacing: 4px;
    overflow: hidden;
    background: linear-gradient(90deg, #fff 10%, #4d4d4d 20%);
    background-repeat: no-repeat;
    background-size: 80%;
    animation: animate 3s linear infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
  }

  @keyframes animate {
    0% {
      background-position: -500%;
    }
    100% {
      background-position: 500%;
    }
  }`;

export const AboutUs = () => {
    const aboutUsRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (aboutUsRef.current) {
            observer.observe(aboutUsRef.current);
        }

        return () => {
            if (aboutUsRef.current) {
                observer.unobserve(aboutUsRef.current);
            }
        };
    }, []);

    return (
        <div ref={aboutUsRef} className='mx-auto max-w-[var(--max-width-9xl)] mb-10'>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 p-6 lg:p-8">
                {/* Text section - with transition classes */}
                <div className={`lg:col-span-2 space-y-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <StyledWrapper>
                        <p className='txt text-2xl text-semibold mt-0 lg:mt-2'>About us</p>
                    </StyledWrapper>
                    <div className='h-1 bg-amber-600 w-40 mt-1 transition-all duration-1000 delay-300'></div>

                    <p className={`text-md leading-9 mt-0 lg:mt-5 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        At <span className='text-md uppercase text-amber-600'>Kusum Airport Hotel</span>, we redefine your airport stay. More than just a place to rest, our hotel is a destination. Whether you're a traveler needing comfort, a business professional seeking convenience, or a tourist exploring the city, we offer everything to make your stay exceptional.

                        <br /><br />

                        From transit stays to business trips, <span className='text-md uppercase text-amber-600'>Kusum Airport Hotel</span> is your home away from home. With a wide range of services and a dedicated team, we ensure your experience is truly memorable. Book your stay now and elevate your journey with us.
                    </p>

                </div>

                {/* Image section - with staggered animations */}
                <div className='lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {/* Main image */}
                    <div className={`md:col-span-2 lg:col-span-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        <img src={Image1} alt="Hotel Kusum" className='w-full h-full object-cover rounded-lg shadow-lg' />
                    </div>

                    {/* Smaller images */}
                    <div className={`flex flex-col space-y-4 md:col-span-2 lg:col-span-1 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        <img src={Image2} alt="Hotel Kusum" className='w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-1000 delay-600' />
                        <img src={Image3} alt="Hotel Kusum" className='w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-1000 delay-700' />
                    </div>
                </div>
            </div>
        </div>
    )
}
