import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../src/components/default/Nav.tsx";
import Footer from "../src/components/default/Footer.tsx"
import IntroductionPage from "../src/pages/introduction/introductionPage.tsx";
import LoginPage from "../src/pages/login/loginPage.tsx";
import SignupPage from "../src/pages/signup/signupPage.tsx";
import Completed from "../src/pages/login/loginCompletedPage.tsx";
import AssetPage from "../src/pages/asset/assetPage.tsx";
import DayPage from "../src/pages/consumption/dayPage.tsx";
import MonthPage from "../src/pages/consumption/monthPage.tsx";
import CalendarPage from "../src/pages/consumption/calendarPage.tsx";
import SummaryPage from "../src/pages/consumption/summaryPage.tsx";
import ErrorPage from "../src/pages/error/404Page.tsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/*서비스 소개페이지 */}
          <Route path="/" element={<IntroductionPage />}></Route>
           
           {/*로그인 페이지 */}
           <Route path="/users/login" element={<LoginPage />}></Route>
           {/*회원가입 페이지 */}
           <Route path="/users/sign_up" element={<SignupPage />}></Route>
           {/*가입완료 페이지*/}
           <Route path="/completed" element={<Completed />}></Route>

           {/*자산 페이지*/}
           <Route path="/asset" element={<AssetPage />}></Route>

           {/*소비 일일페이지 */}
           <Route path="/consumption/day_upload" element ={<DayPage />}></Route>
           {/*소비 월별페이지 */}
           <Route path="/consumption/month_upload" element ={<MonthPage />}></Route>
           {/*소비 달력페이지 */}
           <Route path="/consumption/calendar" element ={<CalendarPage />}></Route>
           {/*소비 요약페이지 */}
           <Route path="/consumption/summary" element ={<SummaryPage />}></Route>
           {/* 404 페이지 */}
           <Route path="*" element ={<ErrorPage />}></Route>
        
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
