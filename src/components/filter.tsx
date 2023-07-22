import { Disclosure } from "@headlessui/react"
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth-context"
import { Genre, GenreEntity } from "../helpers/genre-entity"


type FilterOption = {
  value: string
  label: string
  checked: boolean

}

type Filter = {
  id: string
  name: string
  options: Array<FilterOption>
}


type FilterComponentInput = {
  updateFilter: any
}



const FilterComponent = ({ updateFilter }: FilterComponentInput) => {

  const [filters, setFilters] = useState<Array<Filter>>([])
  const token = useContext(AuthContext)

  useEffect(() => {

    if (!token) {
      return
    }

    new GenreEntity(token).getItems().then(genres => {
      const options = genres.map((g: Genre): FilterOption => ({
        value: String(g.id),
        label: g.name,
        checked: false,
      }))

      setFilters([{ id: 'genres', name: 'Genres', options }])
    })

  }, [token])

  return (

    <div className="mt-4 border-t border-gray-200">
      <h3 className="sr-only">Genres</h3>

      {filters && filters.map((section) => (
        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
          {({ open }) => (
            <>
              <h3 className="-mx-2 -my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">{section.name}</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-6">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-mobile-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={() => updateFilter(section.id, option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}

    </div>
  )
}

export default FilterComponent