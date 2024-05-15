import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/ui/navbar/Navbar';
import AdminPage from './pages/admin/AdminPage';
import EditCard from './pages/admin/EditCard';
import EditUser from './pages/admin/EditUser';
import EditUserProfile from './pages/admin/EditUserProfile';
import CardDetailPage from './pages/card/cardDetailPage/CardDetailPage';
import CardPage from './pages/card/cardPage/CardPage';
import MainPage from './pages/main/MainPage';
import MbtiPage from './pages/mbti/mbtiPage/MbtiPage';
import MbtiTest from './pages/mbti/mbtiTest/MbtiTest';
import MyPageMain from './pages/myPage/myPageMain/MyPageMain';
import ProfileForm from './pages/myPage/propfiePage/profileForm/ProfileForm';
import RegisterPage from './pages/user/RegisterPage';
import RegisterTerms from './pages/user/RegisterTerms';
import { AuthProvider } from './util/Auth';
import { CardProvider } from './util/CardContext';


function App() {

  return (
    <>
      <AuthProvider>
        <Navbar />
        <CardProvider>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/cards' element={<CardPage />} />
            <Route path='/mbti' element={<MbtiPage />} />
            <Route path='/mypage' element={<MyPageMain />} />
            <Route path='/cards/card/:idx' element={<CardDetailPage />} />
            <Route path='/test' element={<MbtiTest />} />
            <Route path='/mypage/profileForm' element={<ProfileForm />} />
            <Route path='/register/registerform' element={<RegisterPage />} />
            <Route path='/register' element={<RegisterTerms />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/admin/customer' element={<EditUser />} />
            <Route path='/admin/card' element={<EditCard />} />
            <Route path='/admin/customer/:idx' element={<EditUserProfile />} />
            <Route path='/admin/card/:idx' element={<EditCard />} />
            {/* <Route path='' element={ } /> */}
          </Routes>
        </CardProvider>
      </AuthProvider>
    </>
  );
};

export default App;