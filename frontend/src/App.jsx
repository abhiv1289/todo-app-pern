import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="signup" element={<Signuppage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
