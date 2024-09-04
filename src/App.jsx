import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import GameDetailPage from "./pages/GameDetailPage";
import GameUpdatePage from "./pages/GameUpdatePage";
function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/games/:id" element={<GameDetailPage />} />
        <Route path="/games/:id/update" element={<GameUpdatePage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
