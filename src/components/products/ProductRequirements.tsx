import { Shield } from 'lucide-react';

interface ProductRequirementsProps {
  requirements: string[];
}

export default function ProductRequirements({ requirements }: ProductRequirementsProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">System Requirements</h3>
      
      <ul className="space-y-3">
        {requirements.map((requirement, index) => (
          <li key={index} className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-orange-400 flex-shrink-0" />
            <span className="text-gray-400">{requirement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}