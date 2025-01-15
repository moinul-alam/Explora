import useLogin from '@src/services/loginService';
import Login from '@src/components/Authentication/Login';

const LoginPage = () => {
  const { formData, handleChange, handleSubmit, error } = useLogin();

  return (
    <Login
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default LoginPage;
