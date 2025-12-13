import logo from '@/assets/images/logo.png';

const AuthHeader = () => (
  <>
    <div className="mt-16 flex justify-center">
      <img src={logo} alt="dark logo" className="h-20" />
    </div>
    <h1 className="text-center text-white text-3xl font-sans">The Smarter Project</h1>
  </>
);

export default AuthHeader;
