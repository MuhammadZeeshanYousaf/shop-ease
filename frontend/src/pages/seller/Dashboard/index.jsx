import Products from "../Products";

const Dashboard = () => {

//    Todo: Create Dashboard View to render here
//   useEffect(() => {
//     api
//       .get("/dashboard")
//       .then(res => {
//         if (res.data.ok) {
//           toast.success(res.data.data);
//         }
//       })
//       .catch(e => {
//         toast.error(e.response.data.message || e.message);
//       });
//   }, []);

  return <Products />;
};

export default Dashboard;
