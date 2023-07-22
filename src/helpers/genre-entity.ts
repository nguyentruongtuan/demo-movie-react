export type Genre = {
  id: number;
  name: string;
};

const host = "http://localhost:8000/api";
export class GenreEntity {
  private uri: string = "/genres?limit=100";

  constructor(private token: string) {}

  public async getItems(): Promise<Array<Genre>> {
    try {
      const genres: Array<Genre> = await fetch(host + this.uri, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      return genres;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
