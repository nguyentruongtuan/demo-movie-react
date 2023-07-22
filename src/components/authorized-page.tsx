import { useAuth0 } from '@auth0/auth0-react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { MovieFilter } from '../helpers/movie-entity';
import FilterComponent from './filter';
import MovieComponent from './movie';


const sortOptions = [
  { name: '10', href: '#10', current: true },
  { name: '20', href: '#20', current: false },
  { name: '30', href: '#30', current: false },
  { name: '40', href: '#40', current: false },
  { name: '50', href: '#40', current: false },
  { name: '60', href: '#40', current: false },
  { name: '70', href: '#40', current: false },
  { name: '80', href: '#40', current: false },
  { name: '90', href: '#40', current: false },
  { name: '100', href: '#40', current: false },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function AuthorizedPage() {
  const { isAuthenticated, logout } = useAuth0();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectFilter, setSelectFilter] = useState<MovieFilter>([{ type: 'genres', value: new Set() }])
  const [displatItems, setDisplatItems] = useState<number>(10)

  const updateFilter = (filterKey: string, value: number) => {

    const newFilters = [...selectFilter]

    for (const filter of newFilters) {
      filter.type === filterKey && filter.value.has(value) ? filter.value.delete(value) : filter.value.add(value)
    }


    setSelectFilter([...newFilters])
  }

  return (<>
    {isAuthenticated &&

      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <FilterComponent updateFilter={updateFilter} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Movies</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button onClick={() => logout()} className="group inline-flex mr-5 justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Logout
                  </Menu.Button>

                </div>

              </Menu>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Display
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>

                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                Number(option.name) === displatItems ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => setDisplatItems(Number(option.name))}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Movies
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <FilterComponent updateFilter={updateFilter} />

              {/* Product grid */}
              <MovieComponent filters={selectFilter} displatItems={displatItems} />

            </div>
          </section>
        </main>
      </div>
    }</>)
}