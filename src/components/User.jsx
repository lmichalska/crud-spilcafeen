import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  // user is a prop containing user data, ex:
  // {id: "...", image: "...", mail: "...", name: "...", phone: "...", title: "..."}
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/users/${user.id}`);
  }

  function getInitials() {
    const initials = user.mail?.split("@")[0]; // get the part before the @ symbol in the mail
    return initials;
  }

  return (
    <article className="user-card" onClick={handleClick}>
      <img src={user.image || "https://placehold.co/600x400?text=Error+loading+image"} alt={user.name} />
      <h2>
        {user.name} ({getInitials()})
      </h2>
      <p className="title">{user.title}</p>
      <p>
        <a href={`mailto:${user.mail}`}>{user.mail}</a>
      </p>
    </article>
  );
}
