import React from 'react';

export default function TermsPage() {
  return (
    <div data-testid="terms-page" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-16 text-center">
          <p className="font-sans font-bold text-[10px] uppercase tracking-[0.4em] text-black/50 dark:text-white/50 mb-6 transition-colors duration-500">
            LEGAL
          </p>
          <h1 className="font-['Impact'] text-[clamp(4rem,10vw,8rem)] uppercase tracking-widest text-black dark:text-white leading-[0.9] mb-8 transition-colors duration-500">
            TERMS & CONDITIONS
          </h1>
          <p className="font-sans font-bold uppercase tracking-widest text-sm md:text-base text-black/40 dark:text-white/40 leading-relaxed max-w-2xl mx-auto transition-colors duration-500">
            Please read these terms carefully before engaging with our platform. 
            By accessing 7toSEVEN, you agree to be bound by the terms outlined below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-24">
        <div className="max-w-[800px] mx-auto px-6 md:px-16 space-y-12 text-xs md:text-sm font-sans font-bold uppercase tracking-[0.2em] text-black/50 dark:text-white/50 leading-relaxed">
          
          <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-black dark:text-white">
              1. PREAMBLE & PURPOSE
            </h2>
            <p>
              7toSEVEN (“Company”) is committed to fostering a legally compliant, transparent, and customer-first environment. 
              These Terms and Conditions govern access to and use of our digital platforms, which offer curated lifestyle 
              products under the 7toSEVEN brand. All Customers, Users, and Visitors are bound by these Terms upon accessing the Website.
            </p>
            <p>
              This document ensures contractual clarity, defines user obligations, and secures the Company’s intellectual property, 
              digital infrastructure, and transaction processes. 7toSEVEN adopts a zero-tolerance approach towards policy violations or abusive conduct.
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-black dark:text-white">
              2. ELIGIBILITY TO CONTRACT
            </h2>
            <p>
              By accessing the Website, placing an order, or registering for an account, the User represents and warrants that they 
              are legally competent to contract under the Indian Contract Act, 1872. Specifically, the User affirms that they have 
              attained the age of 18 years, are of sound mind, and are not disqualified from contracting by any law.
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-black dark:text-white">
              3. USER ACCOUNTS & SECURITY
            </h2>
            <p>
              To access certain features, Users may be required to register for a personal account (“Account”). 
              The User is solely responsible for maintaining the confidentiality and security of their Account credentials. 
              Each Account is personal and non-transferable. The Company reserves the right to suspend, deactivate, or terminate 
              any Account that is found to be in violation of these Terms.
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-black dark:text-white">
              4. ACCEPTABLE USE POLICY
            </h2>
            <p>
              By accessing or using the Website, the User agrees to comply with all applicable laws and regulations. Users shall not:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-black dark:text-white">
              <li><span className="text-black/50 dark:text-white/50">Upload, post, transmit, or make available content that is defamatory, abusive, or otherwise illegal.</span></li>
              <li><span className="text-black/50 dark:text-white/50">Infringe upon or misappropriate any third-party intellectual property rights.</span></li>
              <li><span className="text-black/50 dark:text-white/50">Attempt to gain unauthorized access to the Website, servers, networks, or data.</span></li>
              <li><span className="text-black/50 dark:text-white/50">Engage in data scraping, crawling, or use of automated systems without prior written consent.</span></li>
              <li><span className="text-black/50 dark:text-white/50">Create multiple accounts for fraudulent purposes or abuse discount offers.</span></li>
            </ul>
          </div>

          <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-black dark:text-white">
              5. PRODUCT INFORMATION & PRICING
            </h2>
            <p>
              While the Company endeavors to provide accurate, up-to-date, and error-free information, the User acknowledges 
              that minor variations may occur in the appearance of products due to lighting or display settings. 
              All product images are for illustrative purposes.
            </p>
            <p>
              All prices displayed are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. 
              The Company reserves the right to modify product pricing, discount structures, or promotional offers at its sole discretion.
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-black dark:text-white">
              6. PRIVACY POLICY
            </h2>
            <p>
              Your submission of personal information through the store is governed by our Privacy Policy. 
              We strictly adhere to data protection laws to ensure your information is encrypted and securely handled. 
              We do not sell your personal data to third-party data brokers. By using our platform, you consent to our collection 
              and processing of information as described in our Privacy guidelines.
            </p>
          </div>

          <div className="pt-16 mt-16 border-t border-black/10 dark:border-white/10">
            <div className="bg-[#F9F9F9] dark:bg-[#0A0A0A] p-12 text-center transition-colors duration-500">
              <h3 className="font-['Impact'] text-2xl md:text-3xl uppercase tracking-widest text-black dark:text-white mb-6">
                LEGAL CONTACT
              </h3>
              <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-8 max-w-lg mx-auto">
                For any legal inquiries, official notices, or privacy-related concerns, please reach out to our legal department directly.
              </p>
              <a href="mailto:legal@7toseven.com" className="inline-block border border-black dark:border-white px-8 py-4 font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                LEGAL@7TOSEVEN.COM
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
