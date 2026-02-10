import PageMetaData from '@/components/PageMetaData'
import Background1 from '@/components/Background1'
import TopNavbar from '@/components/TopNavbar'
import Footer from '@/components/Footer'


import React, { useEffect, useState } from 'react'

const StaticCDNPage = ({ title, url }) => {
  const [content, setContent] = useState('Loading...')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    setContent('Loading...')
    setError(null)
    fetch(url)
      .then(res => {
        if (!res.ok || res.status !== 200) {
          throw new Error(`Failed to fetch: HTTP ${res.status}`)
        }
        return res.text()
      })
      .then(text => {
        setContent(text)
      })
      .catch(err => setError(err.message))
  }, [url])

  return (
    <>
      <PageMetaData title={title} />
      <Background1 />
      <TopNavbar />
      <main className="max-w-3xl mx-auto px-4 py-12 text-default-400 mt-16">
        <section className="problem">
          <h2 className="text-3xl mb-6">{title}</h2>
          <section className="mb-8">
            {error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <p className="whitespace-pre-wrap break-words bg-default-100 p-4 rounded text-default-600">{content}</p>
            )}
          </section>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default StaticCDNPage
