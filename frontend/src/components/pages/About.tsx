import React from 'react';

const About: React.FC = () => {
    return (
        <div className="about-page">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">About Our Hotel</h1>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div>
                            <img 
                                src="/api/placeholder/600/400" 
                                alt="Hotel exterior"
                                className="w-full h-64 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-2xl font-semibold mb-4">Welcome to Grand Palace Hotel</h2>
                            <p className="text-gray-600 mb-4">
                                Established in 1985, Grand Palace Hotel has been providing exceptional 
                                hospitality services for over three decades. Located in the heart of the city, 
                                we offer luxurious accommodations with modern amenities.
                            </p>
                            <p className="text-gray-600">
                                Our commitment to excellence ensures every guest enjoys a memorable stay 
                                with personalized service and attention to detail.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-2xl">🏨</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Premium Rooms</h3>
                            <p className="text-gray-600">150 elegantly designed rooms and suites with modern amenities</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-2xl">🍽️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fine Dining</h3>
                            <p className="text-gray-600">Award-winning restaurants serving international cuisine</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-2xl">🏊</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Recreation</h3>
                            <p className="text-gray-600">Swimming pool, spa, fitness center, and conference facilities</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-gray-700 mb-4">
                            To provide an exceptional hospitality experience that exceeds guest expectations 
                            through personalized service, luxurious amenities, and attention to detail.
                        </p>
                        <p className="text-gray-700">
                            We strive to create lasting memories for our guests while maintaining the highest 
                            standards of quality and service in the hospitality industry.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;