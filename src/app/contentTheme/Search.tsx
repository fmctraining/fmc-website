'use client'

import { Search as SearchIcon } from './icons'
import { useRef, useState } from 'react'

export function Search() {
  const modalRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])

  const toggleSearch = () => {
    const modal = modalRef.current
    if (modal) {
      if (modal.open) {
        modal.close()
      } else {
        modal.showModal()
        setTimeout(() => {
          inputRef.current?.focus()
        }, 0)
      }
    }
  }

  // Dummy search function
  const search = (q: string) => {
    if (!q) return []
    // Return 3 dummy results containing the query
    return [
      `Result for "${q}" #1`,
      `Result for "${q}" #2`,
      `Result for "${q}" #3`,
    ]
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setResults(search(value))
  }

  return (
    <div className="normal-case">
      <button className="px-1 xs:px-2 md:px-6 py-1 md:py-3 -mr-1 xs:-mr-2 md:-mr-6 border-b-4 border-transparent hover:border-primary cursor-pointer" onClick={toggleSearch}>
        <SearchIcon className="h-5 xs:h-6" />
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box border-4 rounded-2xl border-white p-4 my-3 w-11/12 max-w-3xl h-11/12">
          <input
            type="text"
            ref={inputRef}
            className="placeholder-white/60 w-full border-4 border-primary rounded-xl p-2 bg-black"
            placeholder="Type to search"
            value={query}
            onChange={handleInputChange}
            autoFocus
          />
          <ul className="mt-2">
            {results.map((result, idx) => (
              <li key={idx} className="">{result}</li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}
