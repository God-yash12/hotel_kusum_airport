

import BgImage from '@/assets/carousel2.png';
import { Link } from 'react-router-dom';

export const BookingHero: React.FC = () => {
    return (
        <div
            style={{ backgroundImage: `url(${BgImage})` }}
            className='relative w-full min-h-[80vh] bg-cover bg-center bg-no-repeat flex flex-col'>
            {/* Dark overlay */}
            <div className='absolute inset-0 bg-black opacity-30'></div>

            {/* Content container */}
            <div className='container mx-auto px-4 flex-grow flex flex-col items-center justify-center relative z-10'>
                {/* Text content - centered */}
                <div className='text-center w-full max-w-3xl px-4 py-8'>
                    <h2 className=' text-white text-2xl lg:text-3xl hover:text-amber-400 transition-colors'>Booking</h2>

                    <p className='text-md text-white font-medium'>
                        <Link to="/" className='hover:text-amber-400 transition-colors'>Home</Link>
                        <span className='mx-2'>/</span>
                        <Link to="/booking" className='hover:text-amber-400 transition-colors'>Booking</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}