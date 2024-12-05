import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
  // Initialize AOS on page load
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="py-12 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-bold text-center text-blue-600"
          data-aos="fade-up"
        >
          Welcome to [Your Website Name]
        </h1>
        <p
          className="mt-4 text-xl text-center text-gray-600"
          data-aos="fade-up"
        >
          Your one-stop platform for hassle-free, instant virtual top-ups and online payments. We’re dedicated to bringing you a seamless experience with fast, secure, and convenient services.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-12">
          <div
            className="space-y-4"
            data-aos="fade-right"
          >
            <h2 className="text-3xl font-semibold text-blue-600">Who We Are</h2>
            <p className="text-lg text-gray-700">
              At [Your Website Name], we believe staying connected and keeping your digital services active should be quick, simple, and accessible from anywhere. Whether it's topping up your mobile, gaming account, or online subscription, we’ve got you covered.
            </p>
            <p className="text-lg text-gray-700">
              We work hard to ensure that every transaction is smooth, safe, and completed in just a few clicks. Our mission is to provide the best digital top-up services while focusing on customer satisfaction, security, and innovation.
            </p>
          </div>

          <div
            className="space-y-4"
            data-aos="fade-left"
          >
            <h2 className="text-3xl font-semibold text-blue-600">Why Choose Us?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-lg text-gray-700">Fast & Secure: Instant top-ups with the latest encryption technology to keep your data safe.</li>
              <li className="text-lg text-gray-700">Wide Range of Services: From mobile phones to online gaming credits, we offer top-up services across multiple platforms.</li>
              <li className="text-lg text-gray-700">24/7 Customer Support: Our team is always here to assist you, ensuring your experience is seamless and stress-free.</li>
              <li className="text-lg text-gray-700">Global Access: No matter where you are, you can top up your accounts anywhere, anytime.</li>
            </ul>
          </div>
        </div>

        {/* Our Services Section */}
        <div className="mt-12" data-aos="fade-up">
          <h2 className="text-3xl font-semibold text-blue-600">Our Services</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-12">
            <div className="text-center" data-aos="zoom-in">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-blue-600">Mobile Top-Ups</h3>
                <p className="mt-2 text-gray-700">Recharge your mobile phone with ease, from local carriers to international networks.</p>
              </div>
            </div>
            <div className="text-center" data-aos="zoom-in" data-aos-delay="200">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-blue-600">Gaming Credit</h3>
                <p className="mt-2 text-gray-700">Level up in your favorite games with virtual credits for PlayStation, Xbox, Steam, and more.</p>
              </div>
            </div>
            <div className="text-center" data-aos="zoom-in" data-aos-delay="400">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-blue-600">Subscription Services</h3>
                <p className="mt-2 text-gray-700">Pay for online services like Netflix, Spotify, and other subscriptions, without any hassle.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div
          className="mt-12 bg-gray-100 py-12 text-center"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-semibold text-blue-600">What Our Customers Say</h2>
          <div className="mt-8 flex justify-center space-x-8">
            <div className="w-64 p-6 bg-white shadow-lg rounded-lg">
              <p className="text-gray-700">"Amazing service! Quick top-up for my phone and very secure." - John Doe</p>
            </div>
            <div className="w-64 p-6 bg-white shadow-lg rounded-lg">
              <p className="text-gray-700">"Love how easy it is to top up my gaming credits. Always a smooth process!" - Jane Smith</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          className="mt-12"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-semibold text-blue-600 text-center">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700">How fast are the top-ups processed?</h3>
              <p className="text-gray-700 mt-2">Top-ups are processed instantly, so you can enjoy your services without delay.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700">Is my data secure?</h3>
              <p className="text-gray-700 mt-2">Yes! We use the latest encryption technology to ensure your data is fully protected during every transaction.</p>
            </div>
          </div>
        </div>

        {/* Client Logos Section */}
        <div
          className="mt-12"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-semibold text-blue-600 text-center">Our Trusted Clients</h2>
          <div className="mt-8 flex justify-center space-x-12">
            <img className="h-16" src="/images/logo1.png" alt="Client 1" />
            <img className="h-16" src="/images/logo2.png" alt="Client 2" />
            <img className="h-16" src="/images/logo3.png" alt="Client 3" />
          </div>
        </div>

        {/* Animated Counter Section */}
        <div
          className="mt-12 text-center"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-semibold text-blue-600">Our Achievements</h2>
          <div className="mt-8 flex justify-center space-x-12">
            <div className="p-6">
              <p className="text-5xl font-bold text-blue-600" data-count="2000">0</p>
              <p className="text-lg text-gray-700">Happy Customers</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-bold text-blue-600" data-count="5000">0</p>
              <p className="text-lg text-gray-700">Successful Top-Ups</p>
            </div>
          </div>
        </div>

        <div
          className="mt-12 text-center"
          data-aos="zoom-in"
        >
          <h2 className="text-3xl font-semibold text-blue-600">Our Commitment to You</h2>
          <p className="mt-4 text-lg text-gray-700">
            We are committed to providing top-notch services that make your life easier and more connected. Whether it's making sure you never run out of mobile data or ensuring your gaming experience is always on point, [Your Website Name] is here to make it happen.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full text-xl hover:bg-blue-700 transition duration-300" data-aos="bounce">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
