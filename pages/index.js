import Head from 'next/head'
import {useState} from "react";

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const link = e.target.link.value
    const res = await fetch(`/api/get-ai-response?link=${link}`)
    const data = await res.json()

    setData(data.choices[0].text.trim().split("|"))

    setLoading(false)

  }

  return (
    <>
      <Head>
        <title>AI Linker</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className="max-w-3xl mx-auto py-10">
        <div>

          <form className="mt-1 mb-10" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="link" className="mb-2 block text-lg font-medium text-gray-500 prose">
              Enter your link
            </label>

            <input
              type="link"
              name="link"
              id="link"
              className="block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-5"
              placeholder="https://"
            />

            <button
              type="submit"
              className="mt-5 w-1/2 mx-auto flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Generate keywords
            </button>
          </form>

          {loading && <div className="text-white">Please wait...</div>}

          {data.length > 0 && !loading && data.map((tag, index) => <div key={index} className="text-white">{tag}</div>)}
        </div>
      </main>
    </>
  )
}
