import React from 'react';
import LoginForm from '../components/login-form/LoginForm';

const LoginPage = () => {
  return (
    <div 
    className='centered' 
    style={{ 
      textAlign: 'center', 
      padding: '50px'
      }}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
