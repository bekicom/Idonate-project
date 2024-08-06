import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../../assets/applogo.png";
import { IconMail, IconLock } from "@tabler/icons-react";
import { useSingInMutation } from "../../context/service/auth.service";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [singIn, { isLoading }] = useSingInMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const { data } = await singIn({ email, password });
      
      if (data) {
        localStorage.setItem("token", data.token);
        navigate("/page"); // muvaffaqiyatli login bo'lsa, "/page" sahifasiga o'tish
      }
    } catch (error) {
      setError(error?.data?.message || "Noto'g'ri login ma'lumotlari");
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login_left">
          <Link className="moniker">
            <img className="logo" src={logo} alt="logo" />
            iDonate
          </Link>
          <div className="login_caption">
            <h6>Xush kelibsiz!</h6>
            <span>Sizni yana ko'rganimizdan xursandmiz!</span>
          </div>
          {/* FORM START */}
          <form className="login_form" onSubmit={handleSubmit}>
            <label className="label">Elektron pochta</label>
            <div className="login_input">
              <cite>
                <IconMail />
              </cite>
              <input
                name="email"
                type="email"
                placeholder="test_admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label className="label">Parol</label>
            <div className="login_input">
              <cite>
                <IconLock />
              </cite>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label className="custom_checkbox">
              <input className="checkbox" type="checkbox" />
              <span className="checkmark">Meni eslab qol</span>
            </label>
            <button className="btn_indigo" type="submit" disabled={isLoading}>
              kirish
            </button>
          </form>
          {/* FORM END */}
          {error && <p className="error">{error}</p>}
          <div className="contact">
            <span>
              Murojaat uchun telegram
              <a href="http://t.me/imarko_uz">@imarko_uz</a>, email:{" "}
              <a href="mailto:info@idonate.uz">info@idonate.uz</a>
            </span>
            <span>
              Akkauntingiz yo'qmi? <Link to={'/register'}>Ro'yhatdan o'tish</Link>
            </span>
          </div>
        </div>
        <div className="login_right">
          <span>Copyright © {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
