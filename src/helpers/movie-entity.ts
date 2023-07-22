import QueryString from "qs";
import { Genre } from "./genre-entity";

export type Movie = {
  id: number;
  title: string;
  year: number;
  genres: Array<Genre>;
};

export type GenreFilter = { type: "genres"; value: Set<number> };
export type YearFilter = { type: "year"; value: Set<number> };
export type LimitFilter = { type: "limit"; value: number };
export type MovieFilter = Array<GenreFilter | YearFilter>;

const host = "http://localhost:8000/api";
export class MovieEntity {
  private uri: string = "/movies";
  constructor(private token: string) {}

  public async getItems(
    filters: MovieFilter,
    displatItems: number
  ): Promise<Array<Movie>> {
    try {
      const filterObject = {
        limit: displatItems,
      } as any;
      for (const filter of filters) {
        if (filter.type === "genres") {
          filterObject[filter.type] = Array.from(filter.value);
        }
      }

      const queryString = QueryString.stringify(filterObject);

      const genres: Array<Movie> = await fetch(
        host + this.uri + "?" + queryString,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      return genres;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
