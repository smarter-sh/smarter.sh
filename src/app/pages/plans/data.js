// Features list for all plans
export const featuresList = [
  'Support',
  'User accounts',
  'AI resources',
  'Command-line interface',
  'app logs',
  'Journal access',
  'Django admin console',
  'MySQL database',
  'Pod ssh access',
  'Custom domain',
  'Kubernetes Control Plane',
  'Custom Application Settings',
  'Maintenance Windows',
];

// Plan data: each plan has a title, price, and feature values
export const plans = [
  {
    title: 'Account',
    description: 'A single account on ubc.smarter.sh. Good for prototyping and proof of concept.',
    price: '$00',
    period: 'month',
    features: ['Community', 'Unlimited', 'Unlimited', 'included', 'N/A', 'N/A', 'read-only', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
    cta: 'Buy',
  },
  {
    title: 'Hosted Platform',
    description: 'A single installation of the smarter platform that runs on the subdomain of your choice: myorg.smarter.sh. Or, your custom domain: app.myorg.com.',
    price: '$000',
    period: 'month',
    features: ['Standard', 'Unlimited', 'Unlimited', 'Included', 'Customizable', 'Included', 'Included', 'Included', 'Included', 'Included', 'N/A', 'N/A', 'N/A'],
    cta: 'Buy',
  },
  {
    title: 'Managed Platform',
    description: 'We manage your dedicated installation, running inside your AWS account. Includes support, maintenance and SLA.',
    price: '$000',
    period: 'month',
    features: ['Standard', 'Unlimited', 'Unlimited', 'Included', 'Customizable', 'Included', 'Included', 'Included', 'Included', 'Included', 'Included', 'Included', 'Customizable'],
    cta: 'Contact Sales',
  },
];

export const footnotes = [
  'Standard Support: 9am - 5pm GMT-6, Monday thru Friday, first come first served. Call for support escalation options.',
  'Account Plan: 20% surcharge on token usage above included amount of XXX tokens.',
  'Custom Settings: Any Smarter or Django setting value can be customized for your deployment.',
  'MySQL database access: Standard TCP/IP over SSH',
  'Kubernetes pod access: Certificate Auth over SSH tunnel with kubectl',
  'Managed Platform: TODO - describe AWS IAM role requirements. https://github.com/smarter-sh/smarter-infrastructure',
];
