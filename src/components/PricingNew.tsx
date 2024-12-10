import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 29,
    features: [
      'Basic power optimization',
      '24/7 monitoring',
      'Email support',
      'Monthly reports'
    ]
  },
  {
    name: 'Pro',
    price: 79,
    popular: true,
    features: [
      'Advanced optimization',
      'Real-time analytics',
      'Priority support',
      'Weekly reports',
      'Custom alerts'
    ]
  },
  {
    name: 'Enterprise',
    price: 199,
    features: [
      'Full optimization suite',
      'Dedicated support',
      'Daily reports',
      'API access',
      'Custom integration',
      'SLA guarantee'
    ]
  }
];

export default function PricingNew() {
  return (
    <div className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Select the perfect plan for your needs and power optimization goals
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`h-full rounded-2xl backdrop-blur-sm p-8 border transition-all duration-300
                ${plan.popular 
                  ? 'bg-white/10 border-orange-500/20 hover:border-orange-500/40' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'}`}
              >
                {/* Plan Name & Price */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="ml-2 text-gray-400">/month</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                        ${plan.popular ? 'bg-orange-500' : 'bg-white/10'}`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-8">
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300
                      ${plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:shadow-orange-500/25'
                        : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}