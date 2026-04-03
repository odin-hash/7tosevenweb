import React, { useState } from 'react';

export default function ReturnsExchangesPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div data-testid="returns-page" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-16 text-center">
          <p className="font-sans font-bold  uppercase tracking-[0.4em]  text-white/50 mb-6 transition-colors duration-500">
            CUSTOMER CARE
          </p>
          <h1 className="font-['Impact']  uppercase tracking-widest  text-white leading-[0.9] mb-8 transition-colors duration-500">
            MAKE A RETURN / EXCHANGE
          </h1>
          <p className="font-sans font-bold uppercase tracking-widest  md:text-base  text-white/40 leading-relaxed max-w-2xl mx-auto transition-colors duration-500">
            We stand by the quality of our garments. If your piece isn't exactly what you expected, 
            we're here to make it right. Review our strict policy and initiate your request below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-24">
        <div className="max-w-[800px] mx-auto px-6 md:px-16 space-y-12">
          
          {/* Section 1 */}
          <div className="pt-8   border-white/10 transition-all duration-300">
            <h2 className="font-['Impact']  md:text-3xl uppercase tracking-widest  text-white mb-6">
              THE 7-DAY WINDOW
            </h2>
            <div className="space-y-4  md:text-sm font-sans font-bold uppercase tracking-[0.2em]  text-white/50 leading-relaxed">
              <p>
                Because our drops are extremely limited and made in small batches, we strictly enforce a <strong className=" text-white">7-day return and exchange policy</strong> from the date of delivery.
              </p>
              <p>
                To be eligible, garments must be unworn, unwashed, and in their original pristine condition with all tags and premium packaging fully intact.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="pt-8   border-white/10 transition-all duration-300">
            <h2 className="font-['Impact']  md:text-3xl uppercase tracking-widest  text-white mb-6">
              HOW TO INITIATE
            </h2>
            <div className="space-y-4  md:text-sm font-sans font-bold uppercase tracking-[0.2em]  text-white/50 leading-relaxed">
              <p>
                Ready to make a return or exchange? Follow these instructions:
              </p>
              <ol className="list-decimal pl-5 space-y-3 mt-4  text-white">
                <li><span className=" text-white/50">Email us at <strong className="text-white break-all md:break-normal">returns@7toseven.com</strong> with your Order Number in the subject line.</span></li>
                <li><span className=" text-white/50">State clearly whether you are requesting a <em className=" text-white opacity-80 not-italic">Return</em> or an <em className=" text-white opacity-80 not-italic">Exchange</em> (and specify the new size if exchanging).</span></li>
                <li><span className=" text-white/50">Attach a clear photo of the garment establishing its unworn condition with tags on.</span></li>
              </ol>
              <p className="mt-8 font-sans font-bold  tracking-[0.3em]  text-white/30">
                OUR SUPPORT TEAM WILL REVIEW WITHIN 24 HOURS AND PROVIDE AN AUTHORIZATION SLIP ALONGSIDE SHIPPING INSTRUCTIONS.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="pt-8   border-white/10 transition-all duration-300">
            <h2 className="font-['Impact']  md:text-3xl uppercase tracking-widest  text-white mb-6">
              EXCEPTIONS & NON-REFUNDABLES
            </h2>
            <div className="space-y-4  md:text-sm font-sans font-bold uppercase tracking-[0.2em]  text-white/50 leading-relaxed">
              <p>
                Certain items are strictly final sale and cannot be returned or exchanged under any circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4  text-white">
                <li><span className=" text-white/50">Limited Archive or "Vault" pieces.</span></li>
                <li><span className=" text-white/50">Accessories, headwear, or undergarments (for hygiene reasons).</span></li>
                <li><span className=" text-white/50">Garments that show any signs of wear, stretching, scent, or alteration.</span></li>
              </ul>
              <p className="mt-8 font-sans font-bold  tracking-[0.3em]  text-white/30">
                PLEASE NOTE THAT ORIGINAL SHIPPING COSTS ARE NON-REFUNDABLE, AND RETURN SHIPPING LOGISTICS ARE THE RESPONSIBILITY OF THE CUSTOMER UNLESS AN INCORRECT OR DEFECTED ITEM WAS RECEIVED.
              </p>
            </div>
          </div>

          <div className="text-center mt-16 mb-8   border-white/10 pt-16">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-sans font-bold  uppercase tracking-[0.2em]  text-white bg-transparent border  border-white px-8 py-4   hover:bg-white hover:text-black transition-all duration-300"
            >
              {isExpanded ? "COLLAPSE DETAILED POLICY" : "EXPAND DETAILED POLICY"}
            </button>
          </div>

          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pt-8">
              <h2 className="font-['Impact']  md:text-3xl uppercase tracking-widest  text-white mb-8   border-white/10 pb-6">
                DETAILED POLICY INFORMATION
              </h2>
              
              <div className="space-y-10  md:text-sm font-sans font-bold uppercase tracking-[0.2em]  text-white/50 leading-relaxed">
                <div>
                  <h3 className="font-['Impact']  uppercase tracking-widest  text-white mb-3">1. REFUND FORMAT & CREDIT NOTES</h3>
                  <p>7toSEVEN DOES NOT PROVIDE REFUNDS IN THE FORM OF CASH, BANK TRANSFERS, OR REVERSE CREDITS TO THE ORIGINAL MODE OF PAYMENT. INSTEAD, FOR ALL APPROVED EXCHANGE REQUESTS, WE ISSUE A NON-CASH REFUND IN THE FORM OF A CREDIT NOTE (PROMO CODE). THIS CODE WILL REPRESENT THE EQUIVALENT MONETARY VALUE OF THE EXCHANGED PRODUCT, EXCLUDING ANY SHIPPING CHARGES, AND WILL BE COMMUNICATED TO YOU VIA EMAIL.</p>
                </div>
                
                <div>
                  <h3 className="font-['Impact']  uppercase tracking-widest  text-white mb-3">2. CONDITIONS OF CREDIT NOTES</h3>
                  <ul className="list-disc pl-5 mt-3 space-y-2  text-white">
                    <li><span className=" text-white/50">WILL BE ISSUED ONLY AFTER THE RETURNED ITEM PASSES A STRICT QUALITY INSPECTION BY OUR FACILITY.</span></li>
                    <li><span className=" text-white/50">WILL HAVE A VALIDITY OF 3 MONTHS FROM THE DATE OF ISSUANCE.</span></li>
                    <li><span className=" text-white/50">IS NOT CONVERTIBLE INTO CASH OR TRANSFERABLE TO ANOTHER USER OR ACCOUNT.</span></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-['Impact']  uppercase tracking-widest  text-white mb-3">3. DEFECTIVE OR INCORRECT ITEMS</h3>
                  <p>IN THE HIGHLY UNLIKELY EVENT THAT AN INCORRECT ITEM IS DELIVERED, CUSTOMERS MUST INITIATE AN EXCHANGE WITHIN 48 HOURS OF DELIVERY ALONG WITH PHOTOGRAPHIC EVIDENCE. AFTER VERIFICATION, 7TOSEVEN WILL ARRANGE RETURN SHIPPING AND SEND THE CORRECT ITEM OR ISSUE A CREDIT NOTE AT NO EXTRA COST TO YOU.</p>
                </div>

                <div>
                  <h3 className="font-['Impact']  uppercase tracking-widest  text-white mb-3">4. QUALITY CHECK FAILURES</h3>
                  <p>WE RESERVE THE RIGHT TO REJECT A RETURN OR REFUSE ISSUANCE OF A PROMO CODE IF THE PRODUCT FAILS THE QUALITY CHECK, WAS RETURNED WITHOUT PRIOR APPROVAL, OR IS MISSING THE ORIGINAL INVOICE, TAGS, OR PACKAGING. IN SUCH CASES, THE ITEM WILL BE SHIPPED BACK TO THE CUSTOMER AND NO CREDIT NOTE WILL BE ISSUED.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center mt-12  bg-[#0A0A0A]">
        <h2 className="font-['Impact']  uppercase tracking-widest  text-white mb-8">
          NEED ASSISTANCE?
        </h2>
        <a 
          href="mailto:support@7toseven.com" 
          className="inline-block   bg-white text-[#0A0A0A] font-sans font-bold  uppercase tracking-[0.2em] px-10 py-4 border  border-white   hover:bg-transparent hover:text-white transition-all duration-300"
        >
          CONTACT SUPPORT
        </a>
      </section>
    </div>
  );
}
