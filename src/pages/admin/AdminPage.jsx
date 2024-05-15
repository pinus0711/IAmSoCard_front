import React, { useState } from 'react';
import Button from '../../component/ui/button/Button';
import EditCard from './EditCard';
import EditUser from './EditUser';

const AdminPage = () => {
  const [isAdminCustomer, setIsAdminCustomer] = useState(true);

  return (
    <>
      <div className="flex justify-center space-x-4">
        <Button
          text={'회원 정보 조회'}
          onClick={() => {
            setIsAdminCustomer(true)
          }}
        />
        <Button
          text={'상품 정보 조회'}
          onClick={() => {
            setIsAdminCustomer(false)
          }}
        />
      </div>
      <div>
        {
          isAdminCustomer === true ? <EditUser /> : <EditCard />
        }
      </div>
    </>
  );
}

export default AdminPage;