import { useContext } from "react";
import { Context } from "./../context/index";
const Username = () => {
  const {
    state: { user },
  } = useContext(Context);
  return (
    <div className="index_username">
      {user ? (
        <div style={{ fontSize: "1.4rem" }}>
          Start learning... {user.name} 📒
        </div>
      ) : (
        <div style={{ fontSize: "1.4rem" }}>
          Start learning... Vidhyarthi 📒
        </div>
      )}
      {/* <h3>Popular Courses 🏆</h3> */}
    </div>
  );
};
export default Username;
