import { useState } from 'react';
import { parseDate } from 'chrono-node';
import { Calendar as CalendarIcon, Users, Minus, Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from 'react-router-dom';

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

export default function ModernBookingSystem() {
    // Check-in date state
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [checkInValue, setCheckInValue] = useState(() => {
        const today = new Date();
        return formatDate(today)
    });
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(() => {
        const initialDate = parseDate('In 2 days');
        return initialDate || undefined;
    });
    const [checkInMonth, setCheckInMonth] = useState(() => {
        const initialDate = parseDate('In 2 days');
        return initialDate || new Date();
    });

    // Check-out date state
    const [checkOutOpen, setCheckOutOpen] = useState(false);
    const [checkOutValue, setCheckOutValue] = useState(() => {
        const today = new Date();
        today.setDate(today.getDate() + 3);
        return formatDate(today);
    });
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 3);
        return tomorrow || undefined;
    });
    const [checkOutMonth, setCheckOutMonth] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 3);
        return tomorrow || undefined;
    });
    // Guest selection state
    const [guestOpen, setGuestOpen] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    // Check-in handlers
    interface CheckInInputChangeEvent {
        target: {
            value: string;
        };
    }

    const handleCheckInInputChange = (e: CheckInInputChangeEvent) => {
        const inputValue: string = e.target.value;
        setCheckInValue(inputValue);
        const parsedDate: Date | null = parseDate(inputValue);
        if (parsedDate) {
            setCheckInDate(parsedDate);
            setCheckInMonth(parsedDate);
        }
    };

    

    interface CheckInKeyDownEvent {
        key: string;
        preventDefault: () => void;
    }

    const handleCheckInKeyDown = (e: CheckInKeyDownEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setCheckInOpen(true);
        }
    };


    const handleCheckInDateSelect = (selectedDate: Date | undefined) => {
        setCheckInDate(selectedDate);
        setCheckInValue(formatDate(selectedDate));
        setCheckInOpen(false);
    };

    // Check-out handlersh
    interface CheckOutInputChangeEvent {
        target: {
            value: string;
        };
    }

    const handleCheckOutInputChange = (e: CheckOutInputChangeEvent) => {
        const inputValue: string = e.target.value;
        setCheckOutValue(inputValue);
        const parsedDate: Date | null = parseDate(inputValue);
        if (parsedDate) {
            setCheckOutDate(parsedDate);
            setCheckOutMonth(parsedDate);
        }
    };

    interface CheckOutKeyDownEvent {
        key: string;
        preventDefault: () => void;
    }

    const handleCheckOutKeyDown = (e: CheckOutKeyDownEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setCheckOutOpen(true);
        }
    };


    const handleCheckOutDateSelect = (selectedDate: Date | undefined) => {
        setCheckOutDate(selectedDate);
        setCheckOutValue(formatDate(selectedDate));
        setCheckOutOpen(false);
    };

    // Guest handlers
    const increaseAdults = () => setAdults(prev => prev + 1);
    const decreaseAdults = () => setAdults(prev => Math.max(1, prev - 1));
    const increaseChildren = () => setChildren(prev => prev + 1);
    const decreaseChildren = () => setChildren(prev => Math.max(0, prev - 1));

    const totalGuests = adults + children;
    const guestText = totalGuests === 1 ? '1 Guest' : `${totalGuests} Guests`;

    const handleGuestDone = () => {
        setGuestOpen(false);
    };

    return (

        <div className='shadow-lg rounded-lg bg-white'>
            <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 mt-4 lg:mt-4 '>


                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-20 py-4'>
                    <div className='mt-5'>
                        <h1 className='text-2xl lg:text-xl font-bold font-display text-gray-900'>Book Online</h1>
                    </div>

                    {/* Check-in Date */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="checkin-date" className="px-1 text-sm font-medium text-gray-700">
                            Check-in Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="checkin-date"
                                value={checkInValue}
                                placeholder="Tomorrow or next week"
                                className="bg-transparent border-0 border-b-2 border-amber-600 rounded-none px-1 py-2 focus:ring-0 focus:border-amber-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none transition-colors"
                                onChange={handleCheckInInputChange}
                                onKeyDown={handleCheckInKeyDown}
                            />
                            <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2 hover:bg-amber-100"
                                    >
                                        <CalendarIcon className="size-4 z-50 text-amber-600" />
                                        <span className="sr-only">Select check-in date</span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0 shadow-lg  border-amber-200 focus:outline-none" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={checkInDate}
                                        captionLayout="dropdown"
                                        month={checkInMonth}
                                        onMonthChange={setCheckInMonth}
                                        onSelect={handleCheckInDateSelect}
                                        className="border-0 bg-gray-800 text-black rounded-md"

                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Check-out Date */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="checkout-date" className="px-1 text-sm font-medium text-gray-700">
                            Check-out Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="checkout-date"
                                value={checkOutValue}
                                placeholder="Tomorrow or next week"
                                className="bg-transparent border-0 border-b-2 border-amber-600 rounded-none px-1 py-2 focus:ring-0 focus:border-amber-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none transition-colors"
                                onChange={handleCheckOutInputChange}
                                onKeyDown={handleCheckOutKeyDown}
                            />
                            <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2 hover:bg-amber-100"
                                    >
                                        <CalendarIcon className="size-4 z-50 text-amber-600" />
                                        <span className="sr-only">Select check-out date</span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0 shadow-lg border-amber-200" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={checkOutDate}
                                        captionLayout="dropdown"
                                        month={checkOutMonth}
                                        onMonthChange={setCheckOutMonth}
                                        onSelect={handleCheckOutDateSelect}
                                        className="border-0 bg-gray-600 text-black rounded-md"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Guest Selection */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="guests" className="px-1 text-sm font-medium text-gray-700">
                            Guests
                        </Label>
                        <div className="relative">
                            <Popover open={guestOpen} onOpenChange={setGuestOpen}>
                                <PopoverTrigger asChild>
                                    <div className="flex items-center cursor-pointer">
                                        <Input
                                            id="guests"
                                            value={guestText}
                                            readOnly
                                            className="bg-transparent border-0 border-b-2 border-amber-600 rounded-none px-1 py-2 focus:ring-0 focus:border-amber-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none transition-colors"
                                        />
                                        <Users className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-amber-600" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-0 shadow-xl border-amber-200" align="start">
                                    <div className="bg-white rounded-lg overflow-hidden">
                                        {/* Header */}
                                        <div className="px-6 py-4 border-b border-gray-100">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-lg font-semibold text-gray-900">Guests</h3>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setGuestOpen(false)}
                                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="mt-2 h-0.5 bg-amber-400 w-full"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 space-y-6">
                                            {/* Adults */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-900">Adults</label>
                                                    <p className="text-xs text-gray-500">Ages 13 or above</p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 rounded-full border-amber-300 hover:bg-amber-50"
                                                        onClick={decreaseAdults}
                                                        disabled={adults <= 1}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-medium">{adults}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 rounded-full border-amber-300 hover:bg-amber-50"
                                                        onClick={increaseAdults}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Children */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-900">Children</label>
                                                    <p className="text-xs text-gray-500">Ages 2-12</p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 rounded-full border-amber-300 hover:bg-amber-50"
                                                        onClick={decreaseChildren}
                                                        disabled={children <= 0}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-medium">{children}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 rounded-full border-amber-300 hover:bg-amber-50"
                                                        onClick={increaseChildren}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="px-6 py-4 border-t border-gray-100">
                                            <Button
                                                onClick={handleGuestDone}
                                                className="w-full h-10 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-[1.02]"
                                            >
                                                Done
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Book Now Button */}
                    <div className={`transition-all duration-500 mt-3 `}>
                        <Button
                            asChild
                            className={`sm:flex px-5 py-5  font-display font-medium text-white text-md text-center bg-[#C3A165] rounded-sm hover:rounded-4xl transition-all duration-300 hover:shadow-lg transform hover:scale-105 `}
                        >
                            <Link to="/booking">Find a Room</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}