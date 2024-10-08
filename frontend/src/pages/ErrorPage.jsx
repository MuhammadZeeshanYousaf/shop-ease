import { useNavigate } from "react-router-dom";

const ErrorPage = ({ code, message = "An unexpected Error" }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center mb-16 mt-5 h-full min-h-96">
      <div className="text-9xl font-bold text-fuchsia-500">{code}</div>
      <div className="text-3xl font-bold text-fuchsia-500 mt-4">{message}</div>
      <div className="text-lg text-gray-500 mt-4">The page you are looking for does not exist.</div>
      <button
        className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded mt-8"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
