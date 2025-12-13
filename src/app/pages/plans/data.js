// Features list for all plans
export const featuresList = [
  'User accounts',
  'AI resources',
  'Custom domain',
  'Team collaboration',
  'feature #5',
  'feature #6',
  'feature #7',
];

// Plan data: each plan has a title, price, and feature values
export const plans = [
  {
    title: 'Account',
    description: 'A single account on platform.smarter.sh. Good for prototyping and proof of concept.',
    price: '$00',
    period: 'month',
    features: ['Unlimited', 'Unlimited', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
    cta: 'Buy',
  },
  {
    title: 'Hosted Platform',
    description: 'A single installation of the smarter platform that runs on the subdomain of your choice: myorg.smarter.sh. Or, your custom domain: app.myorg.com.',
    price: '$000',
    period: 'month',
    features: ['Unlimited', 'Unlimited', 'Included', 'Included', 'Included', 'N/A', 'N/A'],
    cta: 'Buy',
  },
  {
    title: 'Managed Platform',
    description: 'We manage your dedicated installation, running inside your AWS account. Includes support, maintenance and SLA.',
    price: '$000',
    period: 'month',
    features: ['Unlimited', 'Unlimited', 'Included', 'Included', 'Included', 'Included', 'Included'],
    cta: 'Contact Sales',
  },
];
