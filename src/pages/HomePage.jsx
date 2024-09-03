import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [filter, setFilter] = useState(""); // state to handle the filter
  const [sortBy, setSortBy] = useState("name"); // state to handle the sort
  // users: name of the state
  // setUsers: name of the function to set the state

  useEffect(() => {
    getUsers();

    async function getUsers() {
      const data = localStorage.getItem("users"); // get data from local storage

      let usersData = [];

      if (data) {
        // if data exists in local storage
        usersData = JSON.parse(data); // parse the data from string to javascript array
      } else {
        // if data does not exist in local storage fetch the data from the API
        usersData = await fetchUsers(); // fetch the data from the API
      }

      console.log(usersData);
      setUsers(usersData); // set the users state with the data from local storage
    }
  }, []);

  async function fetchUsers() {
    const response = await fetch("https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"); // fetch the data from the API
    const data = await response.json(); // parse the data from string to javascript array
    localStorage.setItem("users", JSON.stringify(data)); // save the data to local storage
    return data; // return the data
  }

  // Search, filter and sort the users array
  let filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const titles = [...new Set(users.map(user => user.title))]; // get all the unique titles from the users array

  if (filter != "") {
    filteredUsers = filteredUsers.filter(user => user.title === filter); // filter the users array by the selected title
  }

  filteredUsers.sort((user1, user2) => user1[sortBy].localeCompare(user2[sortBy])); // sort the users array by the selected sort

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Serach by Name <input placeholder="Search" type="search" onChange={e => setSearchTerm(e.target.value)} />
        </label>
        <label>
          Filter by Title
          <select onChange={e => setFilter(e.target.value)}>
            <option value="">select title</option>
            {titles.map(title => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select name="sort-by" onChange={e => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="title">Title</option>
            <option value="mail">Mail</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredUsers.map(user => (
          <User user={user} key={user.id} />
        ))}
      </section>
    </section>
  );
}
