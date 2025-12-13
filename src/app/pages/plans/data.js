// Features list for all plans
export const featuresList = [
  'Support',
  'User accounts',
  'AI resources',
  'Command-line interface',
  'Django admin console',
  'app logs',
  'Journal access',
  'Pod ssh access',
  'Custom domain',
  'Kubernetes Control Plane',
  'Custom Settings *',
  'Maintenance Windows',
];

// Plan data: each plan has a title, price, and feature values
export const plans = [
  {
    title: 'Account',
    description: 'A single account on platform.smarter.sh. Good for prototyping and proof of concept.',
    price: '$00',
    period: 'month',
    features: ['N/A', 'Unlimited', 'Unlimited', 'included', '* read-only', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A' ],
    cta: 'Buy',
  },
  {
    title: 'Hosted Platform',
    description: 'A single installation of the smarter platform that runs on the subdomain of your choice: myorg.smarter.sh. Or, your custom domain: app.myorg.com.',
    price: '$000',
    period: 'month',
    features: ['Included', 'Unlimited', 'Unlimited', 'Included', 'Full Access', 'Customizable', 'Full Access', 'Included', 'Included', 'N/A', 'N/A', 'N/A'],
    cta: 'Buy',
  },
  {
    title: 'Managed Platform',
    description: 'We manage your dedicated installation, running inside your AWS account. Includes support, maintenance and SLA.',
    price: '$000',
    period: 'month',
    features: ['Included', 'Unlimited', 'Unlimited', 'Included', 'Full Access', 'Customizable', 'Full Access', 'Included', 'Included', 'Included', 'Included', 'Customizable'],
    cta: 'Contact Sales',
  },
];
