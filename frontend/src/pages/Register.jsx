import { useState } from "react";
import api from "../utils/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { capitalize } from "../utils/helpers";

const Register = () => {
  const { signInUser } = useAuth();
  const { role } = useParams();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role,
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormState(prevFormState => ({ ...prevFormState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
      api
        .post("/register", { ...formState })
        .then(res => {
          if (res.data.ok) {
            signInUser(res.data.token);
            navigate("/");
          } else {
            alert(res.data.message);
          }
        })
        .catch(e => {
          console.error(e.response.data?.message || e.message);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 my-12 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-900 text-center">
        <div>{capitalize(role)} Register</div>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-bold text-gray-700" htmlFor="firstName">
            Firstname
          </label>
          <input
            className="p-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
            type="text"
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-bold text-gray-700" htmlFor="lastName">
            Lastname
          </label>
          <input
            className="p-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
            type="text"
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-bold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="p-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-bold text-gray-700" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="p-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleInputChange}
          />
          {passwordMismatch && <p className="mt-2 text-sm text-red-500">Passwords do not match</p>}
        </div>
        <button
          className="w-full p-2 mt-4 text-sm text-white bg-fuchsia-500 rounded-lg hover:bg-fuchsia-700 focus:ring-fuchsia-500 focus:border-fuchsia-500"
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="my-5 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link to={`/login/${role}`} className="font-semibold leading-6 text-fuchsia-600 hover:text-fuchsia-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
