import { Movie } from "../../helpers/movie-entity"

type MovieItemComponentInput = {
  movie: Movie
}

const MovieItemComponent = ({ movie }: MovieItemComponentInput) => {

  const randImageId = Math.floor(Math.random() * 4)
  const imageURL = `/images/movie${randImageId}.jpg`

  return (
    <div className="p-4 w-1/3 shrink">
      <div className="card bg-base-100 shadow-xl h-full">

        <figure><img src={imageURL} alt="Movies" /></figure>
        <div className="card-body flex-col justify-between  ">
          <div>
            <h2 className="card-title self-start">{movie.title}</h2>
          </div>
          <div>
            <div><span className="font-bold">Year:</span>
              <div>
                {movie.year}
              </div> </div>
            <div className="justify-around">

              <span className="font-bold">Genres:</span>
              {movie.genres.map(g => <div key={g.id}>{g.name}</div>)}
            </div>
          </div>
          <div className="card-actions justify-around">
            <button className="btn btn-primary">Watch now</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default MovieItemComponent