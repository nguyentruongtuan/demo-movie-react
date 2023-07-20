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
const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1ER0QyYUw4M2xabHBCcGE1Tnp5LSJ9.eyJpc3MiOiJodHRwczovL2Rldi14MDdlYm8wYzRkeG14eGdqLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiIxUmU4Q0xRMndJZ3lkU05BU3BRSk1ZSXM5bWRMdFVSZkBjbGllbnRzIiwiYXVkIjoiUVdObFJHbG5hWFJoYkE9PSIsImlhdCI6MTY4OTgzNTE0MCwiZXhwIjoxNjg5OTIxNTQwLCJhenAiOiIxUmU4Q0xRMndJZ3lkU05BU3BRSk1ZSXM5bWRMdFVSZiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.4d4bKmEUnvDyi4iJwCtRUdlTrwxH30WsyV5FRMB4mFJuNW3P1Aqb6p4LpDd4znzxElHrDmsgIDX7YpnsdUzg_rkMwmRdb0cCJL2Az12BFz6mY7P09GkDOqkStLg3QJtIJ-jl2ZVoZ4TFFZue88VakQe4CUZL0oj-kUT9QPHtLLmdT2wKLxWTpiMmb17H4oOAy1aX4k3cLmfZwLo6rrHVt8CKq0vgvNaTD7i2xwyQF2O29cjh_oKka5J_C35nzgRJ1JqXYbTzqK7KcqWxi0TqRZE3DXGLA-PeYLezB8Vogr60US_SpZkIPyfynXgZwE529CzYcVc7dU-jtawXDwuZZQ";

export class MovieEntity {
  private uri: string = "/movies";

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
            Authorization: `Bearer ${token}`,
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
