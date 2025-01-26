import Image from "next/image";
import { FaPlaneDeparture, FaMapMarkerAlt, FaStar, FaUsers } from 'react-icons/fa';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[700px] md:h-[600px] flex items-center justify-center pt-24 md:pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Airplane in sky"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center text-white mb-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore the World with LumFlights</h1>
            <p className="text-lg md:text-xl">Your journey begins with us - Find the best deals on flights worldwide</p>
          </div>
          
          {/* Flight Search Form */}
          <div className="bg-white rounded-lg p-4 md:p-6 max-w-4xl mx-auto shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">From</label>
                <div className="flex items-center border border-gray-400 rounded-md p-2">
                  <FaPlaneDeparture className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Departure City"
                    className="w-full outline-none text-gray-800"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">To</label>
                <div className="flex items-center border border-gray-400 rounded-md p-2">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Arrival City"
                    className="w-full outline-none text-gray-800"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-400 rounded-md p-2 text-gray-800"/>
              </div>
              <button className="bg-blue-600 text-white rounded-md py-3 md:py-2 px-4 hover:bg-blue-700 transition-colors self-end">
                Search Flights
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose LumFlights?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Best Prices</h3>
              <p className="text-gray-600">Guaranteed best deals and competitive prices on flights worldwide</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support to assist you anytime</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPlaneDeparture className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Flexible Booking</h3>
              <p className="text-gray-600">Easy booking management and flexible change options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Paris', 'New York', 'Tokyo'].map((city) => (
              <div key={city} className="relative h-[300px] rounded-lg overflow-hidden group">
                <Image
                  src={`/images/${city.toLowerCase().replace(' ', '-')}.jpg`}
                  alt={city}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{city}</h3>
                    <button className="text-sm bg-white text-blue-900 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                      Explore Flights
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-8 text-lg">Sign up now and get exclusive deals on your first booking</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
