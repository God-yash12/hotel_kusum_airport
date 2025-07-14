import { Link } from 'react-router-dom';
import BookingComponent from '../booking/BookingComponent';
import BgImage from '@/assets/facility-bg.png';

export const FacilitiesHero: React.FC = () => {
    return (
        <div
            style={{ backgroundImage: `url(${BgImage})` }}
            className='relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col'>
            {/* Dark overlay */}
            <div className='absolute inset-0 bg-black opacity-30'></div>

            {/* Content container */}
            <div className='container mx-auto px-4 flex-grow flex flex-col items-center justify-center relative z-10'>
                {/* Text content - centered */}
                <div className='text-center w-full max-w-3xl px-4 py-8'>
                    <h1 className='text-2xl md:text-3xl font-bold mb-4 text-white'>


                        <Link to="/contact" className='hover:text-amber-400 transition-colors'>Facilities We provide</Link>
                    </h1>
                    <p className='text-xl md:text-2xl text-white font-medium'>
                        <Link to="/" className='hover:text-amber-400 transition-colors'>Home</Link>
                        <span className='mx-2'>/</span>
                        <Link to="/contact" className='hover:text-amber-400 transition-colors'>Facilities Us</Link>

                    </p>
                </div>
            </div>

            {/* Booking component at bottom */}
            <div className='relative z-10 w-full pb-12'>
                <div className='container mx-auto px-4'>
                    <BookingComponent />
                </div>
            </div>
        </div>
    );
}
