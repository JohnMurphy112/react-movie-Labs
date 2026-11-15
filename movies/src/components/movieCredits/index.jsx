import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import Paper from "@mui/material/Paper";
import { getCredits } from "../../api/tmdb-api";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };
export default function MovieCredits({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['credits', { id: movie.id }],
    queryFn: getCredits,
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  

  return (
  
<Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="credits" sx={{...chip}} color="primary" />
        </li>
        {data.cast.map((g) => (
          <li key={g.id}>
            <Link to={`/actors/${g.id}`}>
            <Chip label={g.name} sx={{...chip}} />
            </Link>
          </li>
        ))}
      </Paper>
      
  );
}
