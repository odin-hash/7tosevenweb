import React, { useState } from 'react';

export default function ReturnsExchangesPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div data-testid="returns-page" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 lg:pb-20 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-16 relative z-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-6 transition-colors duration-500">
            Customer Care
          </p>
          <h1 
            className="font-['Impact'] text-4xl md:text-6xl uppercase tracking-wider text-black dark:text-white leading-[1.15] mb-6 transition-colors duration-500"
            style={{ WebkitTextStroke: '1px currentColor' }}
          >
            Make a Return / Exchange
          </h1>
          <p className="text-sm md:text-base text-black/50 dark:text-white/50 leading-relaxed max-w-2xl mx-auto transition-colors duration-500">
            We stand by the quality of our garments. If your piece isn't exactly what you expected, 
            we're here to make it right. Review our policy and initiate your request below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-24">
        <div className="max-w-[800px] mx-auto px-6 md:px-16 space-y-12">
          
          {/* Section 1 */}
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-tight text-black dark:text-white mb-6">
              The 7-Day Window
            </h2>
            <div className="space-y-4 text-sm text-black/60 dark:text-white/60 leading-relaxed">
              <p>
                Because our drops are extremely limited and made in small batches, we stricty enforce a <strong>7-day return and exchange policy</strong> from the date of delivery.
              </p>
              <p>
                To be eligible, garments must be unworn, unwashed, and in their original pristine condition with all tags and premium packaging fully intact.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-tight text-black dark:text-white mb-6">
              How To Initiate
            </h2>
            <div className="space-y-4 text-sm text-black/60 dark:text-white/60 leading-relaxed">
              <p>
                Ready to make a return or exchange? Follow these specific steps:
              </p>
              <ol className="list-decimal pl-5 space-y-3 mt-4 text-black/80 dark:text-white/80">
                <li>Email us at <strong>returns@7toseven.com</strong> with your Order Number in the subject line.</li>
                <li>State clearly whether you are requesting a <em>Return</em> or an <em>Exchange</em> (and specify the new size if exchanging).</li>
                <li>Attach a clear photo of the garment establishing its unworn condition with tags on.</li>
              </ol>
              <p className="mt-6 italic text-xs">
                Our support team will review your request within 24 hours and provide an authorization slip alongside shipping instructions.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 bg-[#F9F9F9] dark:bg-[#0A0A0A] transition-colors duration-500">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-tight text-black dark:text-white mb-6">
              Exceptions & Non-Refundables
            </h2>
            <div className="space-y-4 text-sm text-black/60 dark:text-white/60 leading-relaxed">
              <p>
                Certain items are strictly final sale and cannot be returned or exchanged under any circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-black/80 dark:text-white/80">
                <li>Limited Archive or "Vault" pieces.</li>
                <li>Accessories, headwear, or undergarments (for hygiene reasons).</li>
                <li>Garments that show any signs of wear, stretching, scent, or alteration.</li>
              </ul>
              <p className="mt-4 text-xs text-black/40 dark:text-white/40">
                Please note that original shipping costs are non-refundable, and return shipping logistics are the responsibility of the customer unless an incorrect or defected item was received.
              </p>
            </div>
          </div>

          <div className="text-center mt-12 mb-4">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-['Impact'] text-sm md:text-base uppercase tracking-widest text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 underline underline-offset-8"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>

          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[3000px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
            <div className="border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 transition-colors duration-500 bg-gray-50 dark:bg-[#111]">
              <h2 className="font-['Impact'] text-2xl uppercase tracking-tight text-black dark:text-white mb-6">
                Detailed Policy Information
              </h2>
              
              <div className="space-y-8 text-sm text-black/60 dark:text-white/60 leading-relaxed">
                <div>
                  <h3 className="font-['Impact'] text-lg uppercase tracking-wider text-black dark:text-white mb-3">1. Refund Format & Credit Notes</h3>
                  <p>7toSEVEN does not provide refunds in the form of cash, bank transfers, or reverse credits to the original mode of payment. Instead, for all approved exchange requests, we issue a non-cash refund in the form of a Credit Note (Promo Code). This code will represent the equivalent monetary value of the exchanged product, excluding any shipping charges, and will be communicated to you via email.</p>
                </div>
                
                <div>
                  <h3 className="font-['Impact'] text-lg uppercase tracking-wider text-black dark:text-white mb-3">2. Conditions of Credit Notes</h3>
                  <ul className="list-disc pl-5 mt-3 space-y-2">
                    <li>Will be issued only after the returned item passes a strict quality inspection by our facility.</li>
                    <li>Will have a validity of 3 months from the date of issuance.</li>
                    <li>Is not convertible into cash or transferable to another user or account.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-['Impact'] text-lg uppercase tracking-wider text-black dark:text-white mb-3">3. Defective or Incorrect Items</h3>
                  <p>In the highly unlikely event that an incorrect item is delivered (whether in terms of color, size, design, or type), customers must initiate an exchange within 48 hours of delivery along with photographic evidence of the product, packaging, and invoice. After verification, 7toSEVEN will arrange return shipping and send the correct item or issue a credit note at no extra cost to you.</p>
                </div>

                <div>
                  <h3 className="font-['Impact'] text-lg uppercase tracking-wider text-black dark:text-white mb-3">4. Quality Check Failures</h3>
                  <p>We reserve the right to reject a return or refuse issuance of a promo code if the product fails the quality check (e.g., used, washed, or tampered), was returned without prior approval, or is missing the original invoice, tags, or packaging. In such cases, the item will be shipped back to the customer and no credit note will be issued.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center border-t border-black/5 dark:border-white/[0.04]">
        <h2 className="font-['Impact'] text-3xl md:text-4xl uppercase tracking-tight text-black dark:text-white mb-6">
          Need Assistance?
        </h2>
        <a 
          href="mailto:support@7toseven.com" 
          className="inline-block bg-black text-white dark:bg-white dark:text-[#0A0A0A] font-['Impact'] text-xs uppercase tracking-[0.15em] px-10 py-3.5 rounded-full hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300"
        >
          Contact Support
        </a>
      </section>
    </div>
  );
}
