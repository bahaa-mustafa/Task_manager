import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Account.module.css";

function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: get user from localStorage after login/register
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <section className={style.account}>
      {!user ? (
        <div className={style.guestCard}>
          <h2>Welcome to Your Account</h2>
          <p>Please log in to access your profile and settings.</p>
          <Link to="/login" className={style.loginBtn}>
            Go to Login
          </Link>
        </div>
      ) : (
        <div className={style.userCard}>
          <img
            src={user.avatar || "https://i.pravatar.cc/150"}
            alt="User Avatar"
            className={style.avatar}
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button
            className={style.logoutBtn}
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </section>
  );
}

export default Account;
