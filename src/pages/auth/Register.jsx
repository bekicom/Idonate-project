import React from "react";
import { FaRegImage, FaRegUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import logo from "../../assets/applogo.png";
import "./register.css";
const Register = () => {
  return (
    <div className="register">
      <div className="left">
        <div className="left-box">
          <a href="https://idonate.uz/" className="logo">
            <img src={logo} alt="" />
            <p>iDonate</p>
          </a>
          <div className="text">
            <h5>Xush kelibsiz</h5>
            <h6>Saytdan foydalanish uchun ro'yxatdan o'ting!</h6>
          </div>
          <div className="inputs">
            <label htmlFor="name">
              <p>Ismingiz</p>
              <div className="input">
                <FaRegUser />
                <input type="text" id="name" placeholder="Name" />
              </div>
            </label>
            <label htmlFor="username">
              <p>Foydalanuvchi nomi</p>
              <div className="input">
                <FaRegUser />
                <input type="text" id="username" placeholder="Username" />
              </div>
            </label>
            <label htmlFor="channelname">
              <p>Kanalingiz nomi</p>
              <div className="input">
                <FaRegUser />
                <input type="text" id="channelname" placeholder="Kanal nomi" />
              </div>
            </label>
            <label htmlFor="channellink">
              <p>Kanalingiz Havolasi (ssilkasi)</p>
              <div className="input">
                <FaRegUser />
                <input
                  type="text"
                  id="channellink"
                  placeholder="Kanal manzili"
                />
              </div>
            </label>
            <label htmlFor="email">
              <p>Email</p>
              <div className="input">
                <IoMail />
                <input type="email" id="email" placeholder="Email" />
              </div>
            </label>
            <label htmlFor="about_channel">
              <p>Kanal haqida</p>
              <div className="input">
                <FaRegUser />
                <input
                  type="text"
                  id="about_channel"
                  placeholder="Kanal manzili"
                />
              </div>
            </label>
            <label htmlFor="screenshot">
              <p>
                Kanalga kontent yuklash (Youtube Studio) dan rasm (screenshot)
                ni yuklang
              </p>
              <div className="input">
                <input style={{ color: "white" }} type="file" id="screenshot" />
              </div>
            </label>
            <label htmlFor="password">
              <p>Parol</p>
              <div className="input">
                <FaRegUser />
                <input type="password" id="password" placeholder="Password" />
              </div>
            </label>
            <label htmlFor="password_again">
              <p>Parol takroran</p>
              <div className="input">
                <FaRegUser />
                <input
                  type="text"
                  id="password_again"
                  placeholder="Parol takroran"
                />
              </div>
            </label>
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <p>
              Men{" "}
              <a href="https://idonate.uz/assets/terms.pdf">Ommaviy oferta</a>
              ni o'qib chiqdim va qabul qilaman.
            </p>
          </div>
          <button>Ro'yhatdan o'tish</button>
          <p>
            Murojaat uchun telegram{" "}
            <a href="https://t.me/idonate_admin">@idonate_admin</a>, <br />
            email: <a href="mailto:info@idonate.uz">info@idonate.uz</a>
          </p>
        </div>
      </div>
      <div className="right">
        <p>Copyright © 2023-2024</p>
        <a href="https://idonate.uz/terms-of-service/payments">
          To'lov shartlari
        </a>
        <a href="https://idonate.uz/privacy-policy">Maxfiylik siyosati</a>
        <a href="https://idonate.uz/public-offer">Ommaviy oferta</a>
      </div>
    </div>
  );
};

export default Register;
