import React from 'react';
import Button from './Button';

interface ServiceCardProps {
  title: string;
  youMightNeed: string[];
  whatIBring: string[];
  recentExample: string;
  deliverables: string;
  investment: string;
  timeline: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  youMightNeed,
  whatIBring,
  recentExample,
  deliverables,
  investment,
  timeline,
}) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden mb-12">
      {/* Header */}
      <div className="bg-primary-600 dark:bg-primary-700 text-white px-8 py-6">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {/* You Might Need This If */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-primary-900 dark:text-primary-400 mb-4">
            You Might Need This If
          </h3>
          <ul className="space-y-2">
            {youMightNeed.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent-500 dark:text-accent-400 mr-2 mt-1">•</span>
                <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What I Bring */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-primary-900 dark:text-primary-400 mb-4">
            What I Bring
          </h3>
          <ul className="space-y-2">
            {whatIBring.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-secondary-500 dark:text-secondary-400 mr-2 mt-1">✓</span>
                <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Example */}
        <div className="mb-8 bg-accent-50 dark:bg-accent-500/10 border-l-4 border-accent-500 dark:border-accent-400 p-6 rounded-r-lg">
          <h3 className="text-lg font-bold text-primary-900 dark:text-primary-400 mb-2">
            Recent Example
          </h3>
          <p className="text-neutral-700 dark:text-neutral-200">{recentExample}</p>
        </div>

        {/* Deliverables, Investment, Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <h4 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase mb-2">
              Deliverables
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300">{deliverables}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase mb-2">
              Investment
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300">{investment}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase mb-2">
              Timeline
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300">{timeline}</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button href="/contact" variant="primary" size="md">
            Start a Conversation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
