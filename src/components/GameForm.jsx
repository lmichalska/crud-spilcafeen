import { useEffect, useState } from "react";

export default function GameForm({ onSubmit, onCancel, game }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [people, setPeople] = useState("");

  useEffect(() => {
    if (game) {
      game.name && setName(game.name); 
      game.location && setLocation(game.location); 
      game.place && setPlace(game.place);
      game.image && setImage(game.image); 
      game.language && setLanguage(game.language);   
      game.description && setDescription(game.description);
      game.people && setPeople(game.description);
    }
  }, [game]);

  function handleOnSubmit(event) {
    event.preventDefault();

    // validate the form
    if (!name || !location || !language|| !description || !people || !place) {
      alert("Please fill out all the fields");
      return;
    } else if (!image) {
      alert("Please paste an image URL");
      return;
    } else if (!image.startsWith("http")) {
      alert("Please paste a valid image URL");
      return;
    }

    const game = {
      // key/name: value from state,
      name: name,
      location: location,
      place: place,
      image: image,
      language: language,
      description: description,
      people: people
    };
    onSubmit(game);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="">Name</label>
      <input id="name" type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
      <label htmlFor="">Language</label>
      <input id="language" type="text" value={language} placeholder="Language" onChange={e => setLanguage(e.target.value)} />
      <label htmlFor="">People</label>
      <input id="people" type="text" value={people} placeholder="People" onChange={e => setPeople(e.target.value)} />
      <label htmlFor="">Description</label>
      <input id="description" type="text" value={description} placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <label htmlFor="location">Location</label>
      <input id="location" type="text" value={location} placeholder="Location" onChange={e => setLocation(e.target.value)} />
      <label htmlFor="place">Place</label>
      <input id="place" type="place" value={place} placeholder="Location (shelf)" onChange={e => setPlace(e.target.value)} />
      <label htmlFor="place">Image URL</label>
      <input type="url" value={image} placeholder="Paste image url" onChange={e => setImage(e.target.value)} />
      <label htmlFor="image-preview"></label>
      <img
        id="image-preview"
        className="image-preview"
        src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
        alt="Choose"
        onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
      />
      <div className="btns">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button>{game ? "Save" : "Create"}</button>
      </div>
    </form>
  );
}
