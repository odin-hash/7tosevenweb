import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div data-testid="shipping-page" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-16 text-center">
          <p className="font-sans font-bold text-[10px] uppercase tracking-[0.4em] text-black/50 dark:text-white/50 mb-6 transition-colors duration-500">
            LOGISTICS
          </p>
          <h1 className="font-['Impact'] text-[clamp(4rem,10vw,8rem)] uppercase tracking-widest text-black dark:text-white leading-[0.9] mb-8 transition-colors duration-500">
            SHIPPING POLICY
          </h1>
          <p className="font-sans font-bold uppercase tracking-widest text-sm md:text-base text-black/40 dark:text-white/40 leading-relaxed max-w-2xl mx-auto transition-colors duration-500">
            A complete guide to our processing times, domestic shipping rates, international delivery, and transit disclaimers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-24">
        <div className="max-w-[800px] mx-auto px-6 md:px-16 space-y-12 text-xs md:text-sm font-sans font-bold uppercase tracking-[0.2em] text-black/50 dark:text-white/50 leading-relaxed">
          
          <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-black dark:text-white">
              1. ORDER PROCESSING
            </h2>
            <p>
              Due to the limited nature of our drops, all orders are subject to a standard processing time of <strong className="text-black dark:text-white">24 to 48 working hours</strong> following successful payment verification. This processing period excludes weekends and public holidays. Processing includes payment authorization, stringent quality checks, and premium packaging prior to dispatch.
            </p>
            <p>
              Once an order has been marked as "processed" by our fulfillment team, it cannot be modified or canceled.
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-black dark:text-white">
              2. DISPATCH & TRACKING
            </h2>
            <p>
              When your order hands over to our premium courier partners, you will receive an automated shipping confirmation email containing your tracking number and a direct link to monitor your package en route. Please allow up to 12 hours for the courier's tracking system to update.
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-black dark:text-white">
              3. SHIPPING CHARGES
            </h2>
            <ul className="list-disc pl-5 space-y-3 mt-2 text-black dark:text-white">
              <li>
                <strong className="text-black/50 dark:text-white/50">DOMESTIC SHIPPING:</strong> Charges are calculated securely at checkout based on your specific delivery zone and order weight.
              </li>
              <li>
                <strong className="text-black/50 dark:text-white/50">INTERNATIONAL SHIPPING:</strong> We ship globally. Rates vary significantly depending on the destination country and chosen delivery speed. International clients are solely responsible for all customs duties, import taxes, and local levies.
              </li>
              <li>
                <strong className="text-black/50 dark:text-white/50">NON-REFUNDABLE LIMITATIONS:</strong> All original shipping charges paid at checkout are strictly non-refundable. This includes orders returned to origin (RTO) due to delivery failure, recipient unavailability, or incorrect address inputs by the customer.
              </li>
            </ul>
          </div>

          <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="font-['Impact'] text-2xl uppercase tracking-widest text-black dark:text-white">
              4. LIABILITY & TRANSIT
            </h2>
            <p>
              7toSEVEN partners with the most reliable independent third-party logistics providers. Once an order is processed and handed over, transit-related risks (including delays, damages, misplacement, or theft) transfer to the logistics provider.
            </p>
            <p>
              While we take commercially reasonable efforts to meet our estimated 3-5 business day delivery windows, we cannot absolutely guarantee exact arrival dates due to highly unpredictable factors such as severe weather, customs delays, or courier disruptions.
            </p>
          </div>

          <div className="pt-16 mt-16 border-t border-black/10 dark:border-white/10">
            <div className="bg-[#F9F9F9] dark:bg-[#0A0A0A] p-12 text-center transition-colors duration-500">
              <h3 className="font-['Impact'] text-2xl md:text-3xl uppercase tracking-widest text-black dark:text-white mb-6">
                SHIPPING SUPPORT
              </h3>
              <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-8 max-w-lg mx-auto">
                If your tracking link has not updated in 72 hours, or if you received an RTO notification in error, contact our logistics support team immediately.
              </p>
              <a href="mailto:shipping@7toseven.com" className="inline-block border border-black dark:border-white px-8 py-4 font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                SHIPPING@7TOSEVEN.COM
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
