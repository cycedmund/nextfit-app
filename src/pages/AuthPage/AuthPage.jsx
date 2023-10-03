import SignUpForm from "../../components/SignUpForm/SignUpForm";

function AuthPage({ setUser }) {
  return (
    <div className="bg-black h-[100vh] text-white">
      <main className="container flex mx-auto h-[80vh] items-center justify-center">
        <SignUpForm setUser={setUser} />
      </main>
    </div>
  );
}

export default AuthPage;
