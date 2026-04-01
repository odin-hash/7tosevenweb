import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "When will my order ship?",
    answer: "Given the limited nature of our drops, please allow 24-48 hours for order processing. Standard domestic shipping takes 3-5 business days. You'll receive a tracking link via email the moment your package leaves our facility."
  },
  {
    question: "What is your return & exchange policy?",
    answer: "We offer a strict 7-day return and exchange window from the date of delivery. Garments must be unworn, unwashed, and have all original tags attached. For more details, please visit our designated Returns & Exchanges page."
  },
  {
    question: "Will sold-out items be restocked?",
    answer: "No. Our collections are strictly limited edition. Once a piece sells out, it enters the vault permanently to ensure exclusivity for our community. We recommend joining our mailing list to get notified of upcoming drops."
  },
  {
    question: "How does the sizing run?",
    answer: "Our garments are designed with a deliberate, premium oversized and boxy fit. We recommend ordering your true size for the intended streetwear silhouette. If you prefer a standard, fitted look, size down one full size."
  },
  {
    question: "How should I care for my garments?",
    answer: "To preserve the integrity of the heavy-weight fabrics and prints: Machine wash cold inside out with similar colors. Do not bleach. Air dry flat. Do not iron directly on prints or labels."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we operate heavily within India. However, international shipping is available for select global drops. Shipping rates and delivery times will be calculated dynamically at checkout based on your territory."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div data-testid="faq-page" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 lg:pb-20 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-16 relative z-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-6 transition-colors duration-500">
            Support
          </p>
          <h1 
            className="font-['Impact'] text-4xl md:text-6xl uppercase tracking-wider text-black dark:text-white leading-[1.15] mb-6 transition-colors duration-500"
            style={{ WebkitTextStroke: '1px currentColor' }}
          >
            F.A.Q.
          </h1>
          <p className="text-sm md:text-base text-black/50 dark:text-white/50 leading-relaxed max-w-2xl mx-auto transition-colors duration-500">
            Answers to your most frequent questions about shipping, drops, sizing, and our policies.
          </p>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-[800px] mx-auto px-6 md:px-16">
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'bg-gray-50 dark:bg-[#111]' : 'bg-transparent'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                  >
                    <span className="font-['Impact'] text-lg md:text-xl uppercase tracking-wider text-black dark:text-white">
                      {item.question}
                    </span>
                    <ChevronDown 
                      className={`text-black/50 dark:text-white/50 transition-transform duration-500 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`} 
                      size={20} 
                    />
                  </button>
                  <div 
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="p-6 md:p-8 pt-0 text-sm md:text-base text-black/60 dark:text-white/60 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center border-t border-black/5 dark:border-white/[0.04]">
        <h2 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight text-black dark:text-white mb-6">
          Still Have Questions?
        </h2>
        <a 
          href="mailto:support@7toseven.com" 
          className="inline-block bg-black text-white dark:bg-white dark:text-[#0A0A0A] font-['Impact'] text-xs uppercase tracking-[0.15em] px-10 py-3.5 rounded-full hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
