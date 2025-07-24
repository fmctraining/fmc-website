'use client'

import { Search as SearchIcon } from './icons'
import { useRef, useState } from 'react'

export function Search() {
  const modalRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const coursesRef = useRef<any[] | null>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = async () => {
    if (!coursesRef.current) {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/courses')
        if (res.ok) {
          coursesRef.current = await res.json()
        } else {
          coursesRef.current = []
          setError(`Error fetching /api/courses: ${res.status} ${res.statusText}`)
        }
      } catch (err: any) {
        coursesRef.current = []
        setError(`Error fetching /api/courses: ${err}`)
      } finally {
        setLoading(false)
      }
    }
  }

  const toggleSearch = async () => {
    const modal = modalRef.current
    if (modal) {
      if (modal.open) {
        modal.close()
      } else {
        await fetchCourses()
        modal.showModal()
        setTimeout(() => {
          inputRef.current?.focus()
        }, 300)
      }
    }
  }

  const search = (q: string) => {
    if (!q || !coursesRef.current) return []
    // Treat whitespace as wildcard: split on whitespace, match all terms in order
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return []
    return coursesRef.current.filter((course: any) => {
      const name = course.name ? course.name.toLowerCase() : ''
      const page = course.page ? course.page.toLowerCase() : ''
      // Create a regex that matches all terms in order, with any text in between
      const pattern = terms.map((term) => escapeRegExp(term)).join('.*')
      const regex = new RegExp(pattern, 'i')
      return regex.test(name) || regex.test(page)
    })
  }

  // Helper to escape regex special characters
  function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setResults(search(value))
  }

  return (
    <div className="normal-case">
      <button
        className="px-1 xs:px-2 md:px-6 py-1 md:py-3 -mr-1 xs:-mr-2 md:-mr-6 border-b-4 border-transparent hover:border-primary cursor-pointer"
        onClick={toggleSearch}
      >
        <SearchIcon className="h-5 xs:h-6" />
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box border-4 rounded-2xl border-white p-4 my-3 w-11/12 max-w-3xl h-11/12">
          <input
            type="text"
            ref={inputRef}
            className="placeholder-white/60 w-full border-4 border-primary rounded-xl p-2 mb-2 bg-black"
            placeholder="Type to search"
            value={query}
            onChange={handleInputChange}
            autoFocus
          />
          {loading && <div className="">Loading courses...</div>}
          <ul className="">
            {results.map((course) => (
              <li key={course.id} className="">
                <a
                  href={course.page}
                  className="block rounded-2xl bg-black/50 py-2 px-4 my-1 -mx-2 hover:underline hover:text-primary hover:bg-slate-200"
                >
                  {course.name}
                </a>
              </li>
            ))}
          </ul>
          {error && (
            <div className="absolute bottom-4 right-8 bg-red-600 text-white px-4 py-2 rounded shadow-lg text-sm z-50">
              {error}
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}
