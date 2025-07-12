

import Image1 from '@/assets/services-bg.jpg';
import Service1 from '@/assets/service1.png';
import Service2 from '@/assets/service2.png';
import Service3 from '@/assets/service3.png';
import Service4 from '@/assets/service4.png';
import Service5 from '@/assets/service5.png';
import Service6 from '@/assets/service6.png';
import UseFadeIn from '@/hooks/UseFadeIn';


const servicesData = [
    {
        id: 1,
        title: "24/7 Room Service",
        description: "Enjoy round-the-clock room service for your convenience.",
        image: Service2
    },
    {
        id: 2,
        title: "Free Wi-Fi",
        description: "Stay connected with complimentary high-speed internet access.",
        image: Service1
    },
    {
        id: 3,
        title: "Airport Shuttle",
        description: "Convenient shuttle service to and from the airport.",
        image: Service5
    },
    {
        id: 4,
        title: "Spa & Wellness",
        description: "Relax and rejuvenate with our spa and wellness services.",
        image: Service6
    },
    {
        id: 5,
        title: "Fitness Center",
        description: "Stay fit during your stay with our fully equipped gym.",
        image: Service4
    },
    {
        id: 6,
        title: "Restaurant & Bar",
        description: "Savor delicious meals and drinks at our on-site restaurant and bar.",
        image: Service3
    }
]

export const Services = () => {
    const titleVisible = UseFadeIn(200);
    
    return (
        <div
            style={{ backgroundImage: `url(${Image1})` }}
            className="w-full min-h-full lg:min-h-screen mx-auto bg-cover bg-center bg-no-repeat py-10">
            <div>
                {/* Title and description - using fadeInStyles */}
                <header 
                    style={titleVisible.fadeInStyles}
                    className="flex flex-col items-center space-y-4 mb-8"
                >
                    <div>
                        <h1 className='text-lg lg:text-2xl font-bold font-display text-center text-amber-600'>Our Services</h1>
                        <div className='h-0.5 bg-amber-500 w-32 mt-2 mx-auto'></div>
                    </div>
                    <p className='text-center'>During Your Stay.</p>
                </header>
            </div>
            
            {/* Services list */}
            <div className='container max-w-6xl mx-auto px-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {servicesData.map((service, index) => {
                        // Stagger the animations with increasing delay
                        const cardDelay = 400 + (index * 100);
                        const { fadeInStyles } = UseFadeIn(cardDelay);
                        
                        return (
                            <div 
                                key={service.id} 
                                style={fadeInStyles}
                                className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300"
                            >
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className='w-14 h-14 object-cover rounded-sm mb-4 mt-4' 
                                />
                                <div className='text-center'>
                                    <h2 className='text-xl font-semibold text-gray-900 mb-2 font-display'>{service.title}</h2>
                                    <p className='text-gray-600'>{service.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};