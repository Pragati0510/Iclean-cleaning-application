import "./App.scss";
import "./AppLayout.scss";
import Loading from "./components/loading";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IssuePage from "./pages/IssuePage";
import IssueUpdateForm from "./components/IssueUpdateForm";
import ProfileFormPage from "./pages/ProfileFormPage";
import IssuePostPage from "./pages/IssuePostPage";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/Sidebar";
import ProfileIssuesPage from "./pages/ProfileIssuesPage";
import ProfileUpdateForm from "./components/ProfileUpdateForm";
import { ContactPage, AboutPage } from "./pages/InfoPages";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Sidebar />
        <div className="Page">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/issue/:id" element={<IssuePage />} />
            <Route path="/post" element={<IssuePostPage />} />
            <Route path="/newprofile" element={<ProfileFormPage />} />
            <Route path="/issue/:id/update" element={<IssueUpdateForm />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/myissues" element={<ProfileIssuesPage />} />
            <Route path="/updateprofile" element={<ProfileUpdateForm />} />
            {/* <Route path='/about'  element={ <AboutPage/>}/> */}
            {/* <Route path='/contact'  element={ <ContactPage/>}/> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
