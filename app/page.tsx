"use client";
import React, { useState, useEffect } from 'react';

// Add custom styles for premium animations
const customStyles = `
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  /* Default state for animated elements */
  [data-animate] {
    opacity: 1;
    transform: none;
  }
  
  /* No additional animated class needed */
  [data-animate].animate-in {
    opacity: 1;
    transform: none;
  }
  
  /* Hero elements show immediately */
  #hero [data-animate] {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Ensure all sections are visible */
  section {
    min-height: auto;
    opacity: 1;
  }
  
  /* Premium scroll indicator */
  @keyframes scroll-indicator {
    0% { opacity: 1; transform: translateY(0); }
    50% { opacity: 0.5; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .scroll-indicator {
    animation: scroll-indicator 2s ease-in-out infinite;
  }
  
  /* Modern dock-style navbar */
  .navbar-dock {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(0, 0, 0, 0.7); /* dark translucent */
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 4px 16px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  
  /* Glass morphism effect */
  .glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const MediaProductionWebsite = () => {
  const [scrollY, setScrollY] = useState(0);

  // Inject custom styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Smooth scroll tracking for parallax effects only
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Very simple intersection observer for animations
  useEffect(() => {
    // Scroll animations disabled as per latest requirement
  }, []);

  const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? 'pt-4' 
          : ''
      }`}>
        <div className={`mx-auto transition-all duration-700 ease-out transform ${
          isScrolled 
            ? 'max-w-4xl navbar-dock rounded-2xl px-6 py-3 translate-y-2 scale-100 opacity-100' 
            : 'max-w-6xl px-6 py-4 translate-y-0 scale-100 opacity-100'
        } flex items-center justify-between`}>
          <div className={`text-2xl font-bold transition-all duration-500 text-white`}>
            MediaNest
          </div>
          <div className="hidden md:flex space-x-6">
            {[
              { name: 'Home', link: 'hero' },
              { name: 'Services', link: 'services' },
              { name: 'Portfolio', link: 'portfolio' },
              { name: 'About', link: 'about' },
              { name: 'Contact', link: 'contact' }
            ].map((item, index) => (
              <a
                key={item.name}
                href={`#${item.link}`}
                className={`transition-all duration-500 hover:scale-105 px-3 py-2 rounded-xl font-medium ${
                  isScrolled 
                    ? 'text-white/80 hover:text-yellow-300' 
                    : 'text-white/90 hover:text-yellow-300 hover:bg-white/10'
                } transform hover:-translate-y-0.5`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className={`p-2 rounded-xl transition-all duration-300 ${
              isScrolled 
                ? 'text-white hover:bg-white/10' 
                : 'text-white hover:bg-white/10'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <button className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-0.5 hidden md:block ${
            isScrolled 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl' 
              : 'bg-white text-black hover:bg-gray-100 shadow-xl'
          }`}>
            Get a Quote
          </button>
        </div>
      </nav>
    );
  };

  const HeroSection = () => (
    <section id="hero" className="relative flex items-center justify-center min-h-screen pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Floating particles */}
        <div 
          className="absolute top-20 right-20 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-40 left-1/4 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.15}px)`, animationDelay: '1s' }}
        />
        <div 
          className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-50 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.08}px)`, animationDelay: '2s' }}
        />
        
        {/* Parallax background shapes */}
        <div 
          className="absolute top-20 right-20 w-64 h-64 bg-yellow-400 opacity-10 rounded-full blur-3xl"
          style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` }}
        />
        <div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"
          style={{ transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.03}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-10 rounded-full blur-3xl"
          style={{ transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0005})` }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        <div 
          className="max-w-xl"
          data-animate
          id="hero-text"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white mb-4">
            Professional Content<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
              for Modern Brands
            </span>
          </h1>
          <div className="mb-6 flex flex-wrap gap-3 text-sm font-semibold text-gray-300">
            {['Video Production', 'Photography', 'Branding', 'Social Media'].map((item, index) => (
              <span 
                key={item}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            MediaNest is your creative partner for high-impact video, photography, branding, and digital content. We help brands, businesses, and creators stand out with stunning visuals and compelling stories.
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-yellow-500/25 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300"
          >
            Start Your Project
            <span className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
        
        <div 
          className="flex flex-col items-center justify-center"
          data-animate
          id="hero-video"
        >
          <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex flex-col items-center hover:shadow-yellow-500/20 transition-all duration-500 transform hover:scale-105">
            <div className="w-24 h-24 flex items-center justify-center mb-6 relative group">
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping opacity-30"></div>
              <div className="absolute inset-2 rounded-full border border-yellow-300 animate-pulse"></div>
              
              {/* Professional play icon */}
              <svg className="w-20 h-20 relative z-10 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="#1f2937" stroke="#374151" strokeWidth="2" />
                <circle cx="24" cy="24" r="16" fill="#111827" stroke="#1f2937" strokeWidth="1" />
                <polygon points="20,16 32,24 20,32" fill="#facc15" className="group-hover:fill-yellow-300 transition-colors" />
              </svg>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-400 block mb-1">Media Production</span>
              <span className="font-bold text-white text-lg">Video & Content Creation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );

  const ContentAdvantageSection = () => (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-100 opacity-20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gray-100 opacity-30 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div 
          className="mb-20 text-center"
          data-animate
          id="services-header"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Why Choose MediaNest?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a professional content and media production company, delivering creative, high-impact solutions for brands and businesses. Our award-winning team brings your vision to life.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: (
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              ),
              title: "Fast Turnaround",
              description: "Quick, reliable delivery for all your content needs—on time, every time. Our streamlined process ensures maximum efficiency."
            },
            {
              icon: (
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              ),
              title: "Creative Excellence",
              description: "Award-winning visuals, storytelling, and strategy to elevate your brand. We craft content that resonates and converts."
            },
            {
              icon: (
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              ),
              title: "Proven Results",
              description: "Boost engagement, grow your audience, and drive results with our content. Backed by data and real success stories."
            }
          ].map((service, index) => (
            <div 
              key={service.title}
              className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group"
              data-animate
              id={`service-${index}`}
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 mb-8 shadow-lg group-hover:shadow-yellow-500/50 transition-all duration-300 group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const PricingSection = () => (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div 
          className="mb-20 text-center"
          data-animate
          id="pricing-header"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Our Packages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our flexible packages designed for brands, businesses, and creators. We deliver high-quality content tailored to your needs—on time, every time.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter",
              price: "$1,200",
              description: "Perfect for small businesses and creators. Includes 1 video (up to 60s), 5 edited photos, and basic branding.",
              icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#facc15" strokeWidth="2">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              ),
              popular: false
            },
            {
              name: "Business",
              price: "$3,500",
              description: "For growing brands. Includes 3 videos, 15 edited photos, social media kit, and creative direction.",
              icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#1f2937" strokeWidth="2">
                  <path d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1h10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              ),
              popular: true
            },
            {
              name: "Enterprise",
              price: "Custom",
              description: "Full-scale campaigns. Custom video/photo production, branding, strategy, and ongoing support.",
              icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#facc15" strokeWidth="2">
                  <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4.5A2.5 2.5 0 0013.5 2h-3A2.5 2.5 0 008 4.5V6m8 0H8m8 0l-2 14H10L8 6" />
                </svg>
              ),
              popular: false
            }
          ].map((plan, index) => (
            <div 
              key={plan.name}
              className={`bg-white rounded-3xl p-10 shadow-lg border ${plan.popular ? 'border-2 border-yellow-400 scale-105 relative' : 'border-gray-100'} flex flex-col items-center hover:shadow-2xl hover:border-yellow-300 transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 group`}
              data-animate
              id={`pricing-${index}`}
              style={{ 
                transitionDelay: `${0.1 + index * 0.2}s`
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  MOST POPULAR
                </div>
              )}
              <div className={`w-20 h-20 ${plan.popular ? 'bg-yellow-400' : 'bg-gray-900'} rounded-full flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">{plan.name}</h3>
              <p className="text-gray-600 mb-6 text-center leading-relaxed">{plan.description}</p>
              <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price}</div>
              <span className="text-gray-500 text-sm mb-8">{plan.price === "Custom" ? "Contact Us" : "Per Project"}</span>
              <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-500 hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 group-hover:shadow-yellow-500/50">
                {plan.price === "Custom" ? "Request Quote" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const LocationsSection = () => (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Floating background elements */}
      <div 
        className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-l from-yellow-100 to-transparent opacity-30 rounded-full blur-3xl"
        style={{ transform: `translateX(${scrollY * 0.03}px)` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-80 h-40 bg-gradient-to-r from-gray-100 to-transparent opacity-20 rounded-full blur-2xl"
        style={{ transform: `translateX(${scrollY * -0.02}px)` }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div 
          className="mb-16 text-center"
          data-animate
          id="locations-header"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Our Studios & Service Areas</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We serve clients globally from our creative studios and remote teams. Wherever you are, MediaNest brings your vision to life.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Delhi", subtitle: "Head Studio" },
            { name: "Noida", subtitle: "Studio" },
            { name: "Greater Noida", subtitle: "Studio" }
          ].map((location, index) => (
            <div 
              key={location.name}
              className="flex items-center justify-between p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:border-yellow-200 transition-all duration-500 cursor-pointer group shadow-sm hover:shadow-xl transform hover:scale-105 hover:-translate-y-2"
              data-animate
              id={`location-${index}`}
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">{location.name}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{location.subtitle}</p>
              </div>
              <svg className="w-6 h-6 text-yellow-500 group-hover:text-yellow-600 group-hover:scale-125 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
        <div 
          className="mt-12 text-center text-gray-600 text-lg"
          data-animate
          id="locations-footer"
          style={{ transitionDelay: '0.8s' }}
        >
          <span className="inline-flex items-center transform hover:scale-105 transition-transform duration-300">
            And remote teams worldwide 
            <span className="ml-2 text-2xl animate-pulse">🌍</span>
          </span>
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    return (
      <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {isMounted && [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `translateY(${scrollY * (0.02 + i * 0.005)}px)`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div 
            className="mb-16 text-center"
            data-animate
            id="testimonials-header"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Client Success Stories</h2>
            <a href="#" className="text-yellow-500 hover:text-yellow-600 font-semibold transition-colors">See All Stories</a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Brand Launch Video",
                quote: "MediaNest's video campaign helped us launch our new product with a bang. We saw a 200% increase in engagement!",
                author: "A. Sharma, Marketing Head",
                gradient: "from-yellow-200 to-yellow-300"
              },
              {
                category: "Social Media Growth",
                quote: "Our Instagram following doubled in 3 months thanks to their creative content and strategy!",
                author: "L. Patel, Influencer",
                gradient: "from-yellow-300 to-yellow-400"
              },
              {
                category: "Corporate Branding",
                quote: "Their branding and photography gave our business a fresh, professional look. Highly recommended!",
                author: "S. Williams, CEO",
                gradient: "from-yellow-400 to-orange-400"
              }
            ].map((testimonial, index) => (
              <div 
                key={testimonial.category}
                className={`bg-gradient-to-br ${testimonial.gradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 group`}
                data-animate
                id={`testimonial-${index}`}
                style={{ transitionDelay: `${0.3 + index * 0.2}s` }}
              >
                <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-6 group-hover:bg-black transition-colors">
                  {testimonial.category}
                </div>
                <p className="text-gray-800 mb-6 text-lg leading-relaxed font-medium group-hover:text-gray-900 transition-colors">
                  "{testimonial.quote}"
                </p>
                <p className="text-gray-700 font-semibold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const CallToActionSection = () => (
    <section className="py-32 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.1}deg)` }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-yellow-300 to-orange-300 opacity-5 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.06}px) rotate(${scrollY * -0.1}deg)` }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <div 
          data-animate
          id="cta-content"
          style={{ }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Invest in Your Story<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Shine for Years
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            MediaNest delivers creative, reliable, and impactful content for brands and businesses. Let's create something unforgettable together.
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-yellow-500/25 transition-all transform hover:scale-110 hover:-translate-y-2 duration-300 group"
          >
            Start Your Journey
            <span className="ml-3 inline-block transform group-hover:translate-x-2 transition-transform">✨</span>
          </a>
        </div>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-10 left-10 w-40 h-40 bg-yellow-100 opacity-20 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        />
        <div 
          className="absolute bottom-20 right-10 w-60 h-60 bg-gray-100 opacity-30 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div 
          className="mb-16 text-center"
          data-animate
          id="contact-header"
          style={{ }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your vision to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
            data-animate
            id="contact-form"
            style={{ transitionDelay: '0.2s' }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none"
                />
              </div>
              <input 
                type="text" 
                placeholder="Project Type" 
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none"
              />
              <textarea 
                rows={5} 
                placeholder="Tell us about your project..." 
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none resize-none"
              />
              <button 
                type="submit"
                className="w-full bg-black text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1 duration-300"
              >
                Send Message
                <span className="ml-2">🚀</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div 
            className="space-y-8"
            data-animate
            id="contact-info"
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900">Email Us</h4>
              </div>
              <p className="text-gray-600">info@medianest.com</p>
              <p className="text-gray-600">hello@medianest.com</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900">Call Us</h4>
              </div>
              <p className="text-gray-600">+91 89798 43626</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900">Visit Us</h4>
              </div>
              <p className="text-gray-600">Delhi Head Studio</p>
              <p className="text-gray-600">India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        />
        <div 
          className="absolute bottom-0 right-0 w-60 h-60 bg-gray-600 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        />
      </div>

      <div className="max-w-6xl mx-auto py-16 px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div 
            data-animate
            id="footer-brand"
            style={{ }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">MediaNest</h3>
            <p className="text-gray-400 mb-4">Professional Content & Media Production</p>
            <p className="text-gray-500 text-sm">© 2025 MediaNest. All rights reserved.</p>
          </div>
          <div 
            data-animate
            id="footer-services"
            style={{ transitionDelay: '0.2s' }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <div className="space-y-2">
              {['Video Production', 'Photography', 'Branding', 'Social Media'].map((service, index) => (
                <a 
                  key={service}
                  href="#" 
                  className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:translate-x-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {service}
                </a>
              ))}
            </div>
          </div>
          <div 
            data-animate
            id="footer-contact"
            style={{ transitionDelay: '0.4s' }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-white transition-colors">info@medianest.com</p>
              <p className="text-gray-400 hover:text-white transition-colors">+91 89798 43626</p>
              <p className="text-gray-400 hover:text-white transition-colors">Delhi, India</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ContentAdvantageSection />
      <PricingSection />
      <LocationsSection />
      <TestimonialsSection />
      <CallToActionSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default MediaProductionWebsite; 