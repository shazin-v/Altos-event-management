import React from "react";

const Home = () => {
  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleSignup = () => {
    window.location.href = "/signup";
  };
  return (
    <section className="">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 m-2">
              <p className="mt-3 text-5xl text-gray-500">
                {"Event Management"}
              </p>
            </h1>
            <p className="text-2xl text-gray-500 mb-8">
              "Bringing Your Events to Life: Simplified Registration, Seamless
              Management, and Easy Ticketing."
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div>
                <button
                  onClick={handleLogin}
                  className="btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0"
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  onClick={handleSignup}
                  className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
