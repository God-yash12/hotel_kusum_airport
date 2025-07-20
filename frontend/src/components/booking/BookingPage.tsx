import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';

function formatDate(date: Date | undefined): string {
    if (!date) {
        return "";
    }
    return date.toLocaleDateString("en-US", {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

function calculateNights(checkIn: Date | undefined, checkOut: Date | undefined): number {
    if (!checkIn || !checkOut) return 0;
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

function isDateInRange(date: Date, start: Date | undefined, end: Date | undefined): boolean {
    if (!start || !end) return false;
    return date >= start && date <= end;
}

export default function BookingPage() {
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [checkOutOpen, setCheckOutOpen] = useState(false);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleCheckInSelect = (date: Date | undefined) => {
        setCheckInDate(date);
        setCheckInOpen(false);
        
        // If check-out date is before or same as new check-in date, reset it
        if (date && checkOutDate && checkOutDate <= date) {
            setCheckOutDate(undefined);
        }
    };

    const handleCheckOutSelect = (date: Date | undefined) => {
        setCheckOutDate(date);
        setCheckOutOpen(false);
    };

    const isCheckOutDisabled = (date: Date) => {
        if (date < today) return true;
        if (checkInDate && date <= checkInDate) return true;
        return false;
    };

    const modifiers = {
        selected: (date: Date) => {
            if (checkInDate && format(date, 'yyyy-MM-dd') === format(checkInDate, 'yyyy-MM-dd')) return true;
            if (checkOutDate && format(date, 'yyyy-MM-dd') === format(checkOutDate, 'yyyy-MM-dd')) return true;
            return false;
        },
        range: (date: Date) => {
            if (checkInDate && checkOutDate) {
                return isDateInRange(date, checkInDate, checkOutDate);
            }
            return false;
        },
        rangeStart: (date: Date) => {
            return checkInDate ? format(date, 'yyyy-MM-dd') === format(checkInDate, 'yyyy-MM-dd') : false;
        },
        rangeEnd: (date: Date) => {
            return checkOutDate ? format(date, 'yyyy-MM-dd') === format(checkOutDate, 'yyyy-MM-dd') : false;
        }
    };

    const modifiersStyles = {
        selected: {
            backgroundColor: '#f59e0b',
            color: 'white',
            fontWeight: 'bold'
        },
        range: {
            backgroundColor: '#fef3c7',
            color: '#92400e'
        },
        rangeStart: {
            backgroundColor: '#f59e0b',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '6px 0 0 6px'
        },
        rangeEnd: {
            backgroundColor: '#f59e0b',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '0 6px 6px 0'
        }
    };

    const nights = calculateNights(checkInDate, checkOutDate);

    return (
        <div className="min-h-screen p-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12 pt-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 font-display">
                        Book Your Perfect Stay
                    </h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
                </div>

                {/* Booking Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center font-display tracking-wider">
                        Select Your Dates
                    </h2>
                    
                    {/* Date Selection */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Check-in Date */}
                        <div className="space-y-2">
                            <Label htmlFor="check-in" className="text-lg font-medium text-gray-700">
                                Check-in Date
                            </Label>
                            <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="check-in"
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal h-12 text-base border-1 hover:border-amber-400 focus:border-amber-500 bg-gray-50"
                                    >
                                        <CalendarIcon className="mr-3 h-5 w-5 text-gray-500" />
                                        {checkInDate ? format(checkInDate, "PPP") : "Select check-in date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={checkInDate}
                                        onSelect={handleCheckInSelect}
                                        disabled={(date) => date < today}
                                        modifiers={modifiers}
                                        modifiersStyles={modifiersStyles}
                                        className="rounded-md border"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Check-out Date */}
                        <div className="space-y-2">
                            <Label htmlFor="check-out" className="text-lg font-medium text-gray-700">
                                Check-out Date
                            </Label>
                            <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="check-out"
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal h-12 text-base border-1 hover:border-amber-400 focus:border-amber-500 bg-gray-50"
                                        disabled={!checkInDate}
                                    >
                                        <CalendarIcon className="mr-3 h-5 w-5 text-gray-500" />
                                        {checkOutDate ? format(checkOutDate, "PPP") : "Select check-out date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={checkOutDate}
                                        onSelect={handleCheckOutSelect}
                                        disabled={isCheckOutDisabled}
                                        modifiers={modifiers}
                                        modifiersStyles={modifiersStyles}
                                        className="rounded-md border"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Stay Summary */}
                    {checkInDate && checkOutDate && (
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center font-display">
                                Your Stay Summary
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4 text-center">
                                <div className="bg-white rounded-lg p-4 shadow-lg">
                                    <p className="text-sm text-gray-600 mb-1">Check-in</p>
                                    <p className="font-semibold text-gray-800">
                                        {formatDate(checkInDate)}
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-lg">
                                    <p className="text-sm text-gray-600 mb-1">Check-out</p>
                                    <p className="font-semibold text-gray-800">
                                        {formatDate(checkOutDate)}
                                    </p>
                                </div>
                                <div className="bg-amber-500 text-white rounded-lg p-4 shadow-lg">
                                    <p className="text-sm mb-1 opacity-90">Total Nights</p>
                                    <p className="text-2xl font-bold">{nights}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Guest Information */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <Label htmlFor="adults" className="text-lg font-medium text-gray-700">
                                Adults
                            </Label>
                            <Input
                                id="adults"
                                type="number"
                                min="1"
                                max="10"
                                defaultValue="2"
                                className="h-12 text-base border bg-gray-50 transition-colors duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="children" className="text-lg font-medium text-gray-700">
                                Children
                            </Label>
                            <Input
                                id="children"
                                type="number"
                                min="0"
                                max="10"
                                defaultValue="0"
                               className="h-12 text-base border bg-gray-50 transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Book Now Button */}
                    <Button 
                        className="w-full h-14 text-lg font-semibold bg-[#C3A165] hover:bg-[#C3A165] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={!checkInDate || !checkOutDate}
                    >
                        {checkInDate && checkOutDate 
                            ? `Check Availability - ${nights} Night${nights !== 1 ? 's' : ''}`
                            : 'Check Room Availability'
                        }
                    </Button>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarIcon className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Free Cancellation</h3>
                        <p className="text-gray-600">Cancel up to 24 hours before check-in</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarIcon className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Price Guarantee</h3>
                        <p className="text-gray-600">We'll match any lower price you find</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarIcon className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">24/7 Support</h3>
                        <p className="text-gray-600">Round-the-clock customer assistance</p>
                    </div>
                </div>
            </div>
        </div>
    );
}