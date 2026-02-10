import React from 'react'

const FeaturesList = ({ features }) => (
  <div className="rounded-xl bg-default-100/80 p-6 shadow-md">
    <h4 className="mb-4 text-lg font-semibold text-white">Features</h4>
    <ul className="space-y-2 text-default-200">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-orange-500"></span>
          {feature}
        </li>
      ))}
    </ul>
  </div>
)

export default FeaturesList
