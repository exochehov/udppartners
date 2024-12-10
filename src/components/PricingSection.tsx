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

export default function PricingSection() {
  return (
    <div className="relative py-24 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-950 via-slate-950 to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-slate-400">
            Select the perfect plan for your needs and power optimization goals
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl backdrop-blur-sm border border-slate-800 
                         ${plan.popular ? 'bg-slate-900/60' : 'bg-slate-900/40'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-slate-400 ml-2">per month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-slate-300">
                      <Check className="w-5 h-5 text-orange-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300
                                  ${plan.popular 
                                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:shadow-lg hover:shadow-orange-500/25' 
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}