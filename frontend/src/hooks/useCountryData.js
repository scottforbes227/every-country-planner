import { useMemo } from "react";

const mockCountries = [
  {
    countryCode: "FRA",
    status: "VISITED",
    visitDates: [{ start: "2022-07-01", end: "2022-07-14", label: "Summer 2022" }],
    rating: 5,
    notes: "Best croissants.",
  },
  {
    countryCode: "JPN",
    status: "PLANNED",
    visitDates: [],
    rating: null,
    notes: "Cherry blossom season",
  },
  {
    countryCode: "DEU",
    status: "UNVISITED",
    visitDates: [],
    rating: null,
    notes: null,
  },
];

export default function useCountryData() {
  return useMemo(() => mockCountries, []);
}
