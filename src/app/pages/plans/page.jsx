import React from 'react'
import AuthHeader from '@/components/AuthHeader'
import AuthLayout from '@/components/AuthLayout'
import PageMetaData from '@/components/PageMetaData'
import Plan from './Plan'
import { plans, featuresList, footnotes } from './data'
import FeaturesList from './FeaturesList'

const Plans = () => {
  return (
    <>
      <PageMetaData title="Plans" />
      <AuthHeader />
      <AuthLayout>
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-default-200/60 backdrop-blur-2xl">
          <div className="flex flex-col lg:flex-row gap-10 p-10">
            {/* Right column: Plans */}
            <div className="right-column flex-1">
              <h2 className="mb-6 text-3xl text-white text-center">Hosting Plans</h2>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {plans.map((plan) => (
                  <Plan key={plan.title} plan={plan} featuresList={featuresList} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-neutral-200 mt-8 ml-8 mr-8 font-normal">
          <h6 className="underline mb-2">Notes:</h6>
          <ul className="ml-10 list-disc">
            {footnotes.map((note, index) => (
              <li key={index}><em>{note}</em></li>
            ))}
          </ul>
        </div>
      </AuthLayout>
    </>
  )
}

export default Plans
