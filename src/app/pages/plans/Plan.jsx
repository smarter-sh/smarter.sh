import React from 'react'

const Plan = ({ plan, featuresList }) => {
  return (
    <div className="flex flex-col rounded-2xl bg-default-800/80 p-6 shadow-lg backdrop-blur-2xl">
      <h3 className="mb-2 text-xl font-semibold text-white">{plan.title}</h3>
      <p className="mb-4 text-default-300" style={{ minHeight: '100px' }}>{plan.description}</p>
      <div className="mb-4 flex items-end">
        <span className="text-4xl font-bold text-orange-500">{plan.price}</span>
        {plan.period ? (
          <span className="ml-1 text-base text-default-300">/{plan.period}</span>
        ) : null}
      </div>
      <table className="mb-6 w-full text-left text-default-200">
        <tbody>
          {featuresList.map((feature, idx) => (
            <tr key={feature}>
              <td className="py-1 pr-2 text-sm">{feature}</td>
              <td className="py-1 pl-2 text-right font-semibold">
                {plan.features[idx]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-auto rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 transition-all">
        {plan.cta}
      </button>
    </div>
  )
}

export default Plan
