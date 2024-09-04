import { useNavigate } from "react-router-dom";

export default function GameDetail({ game }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/games/${game.id}`);
  }

  return (
    <article className="game-card" onClick={handleClick}>
      <img src={game.image || "https://placehold.co/600x400?text=Error+loading+image"} alt={game.name} />
      <h2> {game.name} </h2>
      <p> Language: {game.language}</p> 
      <p> People: {game.people}</p> 
       <p> Available at: {game.place}</p> 
       <br></br>
       <p>  {game.description}</p> 

    </article>
  );
}
