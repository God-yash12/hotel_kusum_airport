import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,       
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import carousel1 from "../../assets/carousel1.jpg";
import carousel2 from "@/assets/carousel2.png";
import carousel3 from "@/assets/carousel3.jpg"; 
import carousel4 from "@/assets/carousel4.png";
import carousel5 from "@/assets/carousel5.png";

export default function Home() {
  const slides = [
    {
      title: "Hotel Kusum - Your Second Home",
      description: "Experience the warmth of Nepali hospitality in our comfortable and welcoming environment",
      image: carousel5
    },
    {
      title: "Travel All Over Nepal",
      description: "We can arrange your travel to all major destinations across Nepal's beautiful landscapes",
      image: carousel4
    },
    {
      title: "Franchise in Major Cities",
      description: "Our hotels are located in all major cities of Nepal for your convenience",
      image: carousel3
    },
    {
      title: "Affordable Price & Accommodation",
      description: "Quality stays that won't break your budget - perfect for all types of travelers",
      image: carousel2  
    },
    {
      title: "Free Guide in Kathmandu Valley",
      description: "Explore Kathmandu's heritage with our complimentary guide service",
      image: carousel1
    }
  ];

  return (
    <div className="h-[80vh] w-full relative lg:force:mt-0">
      <Carousel 
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          })
        ]}
        opts={{
          align: "start",
          loop: true
        }}
        className="h-full lg:h-[90vh] w-full"
      >
        <CarouselContent className="h-full lg:force:h-[90vh]">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="w-full pl-0">
              <div className="relative h-full lg:h-[90vh] w-full">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full sm:object-cover object-cover md:object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                  <div className="max-w-4xl mx-auto text-white space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-20 text-white hidden md:flex" />
        <CarouselNext className="right-4 z-20 text-white hidden md:flex" />
      </Carousel>
      
    </div>
  )
}