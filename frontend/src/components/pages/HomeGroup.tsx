import  BookingComponent  from "../booking/BookingComponent"
import {Rooms}  from "../rooms/Rooms"
import { Services } from "../services/Services"
import { Testimonials } from "../testimonials/Testimonial"
import { AboutUs } from "./About"
import Home from "./Home"


export const HomeGroup = () => {
    return (
        <div className="flex flex-col space-y-9 lg:space-y-20 sm:mt-20px lg:force:mt-0">
            <Home />
            <BookingComponent />
            <AboutUs />
            <Rooms />
            <Services />
            <Testimonials />
        </div>
    )
}