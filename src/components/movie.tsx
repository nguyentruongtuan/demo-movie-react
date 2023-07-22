import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { useContext, useEffect, useState } from "react"
import { Bar, Pie } from "react-chartjs-2"
import { Movie, MovieEntity, MovieFilter } from "../helpers/movie-entity"
import MovieItemComponent from "./movie/movie-item"
import { AuthContext } from '../context/auth-context'
Chart.register(CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, ArcElement, Tooltip, Legend);

type MovieContent = {
  filters: MovieFilter
  displatItems: number
}

const MovieComponent = ({ filters, displatItems }: MovieContent) => {

  const [movies, setMovies] = useState<Array<Movie>>([])
  const token = useContext(AuthContext)

  const randomRGB = () => {
    const colorString = [1, 2, 3].map(item => Math.floor(Math.random() * 255)).join(",")

    return `rgba(${colorString}, 0.2)`
  }

  const getBarChartData = () => {

    const groupByYear = {} as any
    for (const movie of movies) {
      if (groupByYear[movie.year] === undefined) {
        groupByYear[movie.year] = []
      }

      groupByYear[movie.year].push(movie.id)

    }

    const yearLabels = []
    const barDataset = []

    for (const key in groupByYear) {
      yearLabels.push(key)
      barDataset.push(groupByYear[key].length)
    }

    const barChart = {
      labels: yearLabels,
      datasets: [
        {
          label: 'Year',
          data: barDataset,
          backgroundColor: randomRGB()
        }
      ],
    }

    return barChart
  }

  const getPieChartData = () => {

    const groupByGenre = movies.reduce((group, item) => {

      item.genres.reduce((r, g) => {
        r[g.name] = r[g.name] || []
        r[g.name].push(item)
        return r
      }, group)

      return group
    }, Object.create(null))

    const genreLabels = []
    const genreDataset = []
    const genreColors = []

    for (const key in groupByGenre) {
      genreLabels.push(key)
      genreDataset.push(groupByGenre[key].length)
      genreColors.push(randomRGB())
    }


    return {
      labels: genreLabels,
      datasets: [
        {
          label: 'Genres',
          data: genreDataset,
          backgroundColor: genreColors
        }
      ],
    }
  }



  useEffect(() => {
    if (!token) {
      return
    }

    (async () => {

      try {

        const movies = await new MovieEntity(token).getItems(filters, displatItems)

        setMovies(movies)
      } catch (error) {
        console.log(error)
        setMovies([])
      }
    })()

  }, [filters, displatItems, token])

  return (
    <div className="lg:col-span-3">
      <div className="lg:col-span-3 flex flex-wrap">
        <div className="p-4 w-1/2 flex flex-col justify-end">
          <div>
            <Bar
              data={getBarChartData()}
            />
          </div>
          <div>

            <h1 className="font-bold text-center">Year</h1>
          </div>
        </div>
        <div className="p-4 w-1/2 flex flex-col justify-between">
          <Pie
            data={getPieChartData()}
          />
          <h1 className="font-bold text-center">Genres</h1>
        </div>
      </div>
      <div className="lg:col-span-3 flex flex-wrap justify-between">
        {movies && movies.map(m => <MovieItemComponent key={m.id} movie={m} />)}
      </div>
    </div>
  )
}

export default MovieComponent