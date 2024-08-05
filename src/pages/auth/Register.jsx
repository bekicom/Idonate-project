import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import logo from "../../assets/applogo.png";
import "./register.css";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('first_name', data.name);
    formData.append('last_name', data.username);
    formData.append('username', data.username);
    formData.append('channel', data.channelname);
    formData.append('channel_url', data.channellink);
    formData.append('channel_description', data.about_channel);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('phone', data.phone); // Added phone number field
    formData.append('channel_screenshot', data.screenshot[0]);

    try {
      const response = await axios.post(
        "http://192.168.100.35/api/v1/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="register">
      <div className="left">
        <div className="left-box">
          <a href="https://idonate.uz/" className="logo">
            <img src={logo} alt="" />
            <p>iDonate</p>
          </a>
          <div className="text">
            <b>Xush kelibsiz</b>
            <h6>Saytdan foydalanish uchun ro'yxatdan o'ting!</h6>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs">
              <label htmlFor="name">
                <p>Ismingiz</p>
                <div className="input">
                  <FaRegUser />
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    {...register('name', { required: true })}
                  />
                </div>
              </label>
              <label htmlFor="username">
                <p>Foydalanuvchi nomi</p>
                <div className="input">
                  <FaRegUser />
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    {...register('username', { required: true })}
                  />
                </div>
              </label>
              <label htmlFor="channelname">
                <p>Kanalingiz nomi</p>
                <div className="input">
                  <FaRegUser />
                  <input
                    type="text"
                    id="channelname"
                    placeholder="Kanal nomi"
                    {...register('channelname', { required: true })}
                  />
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
                    {...register('channellink', { required: true })}
                  />
                </div>
              </label>
              <label htmlFor="email">
                <p>Email</p>
                <div className="input">
                  <IoMail />
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                  />
                </div>
              </label>
              <label htmlFor="about_channel">
                <p>Kanal haqida</p>
                <div className="input">
                  <FaRegUser />
                  <input
                    type="text"
                    id="about_channel"
                    placeholder="Kanal haqida"
                    {...register('about_channel', { required: true })}
                  />
                </div>
              </label>
              <label htmlFor="screenshot">
                <p>
                  Kanalga kontent yuklash (Youtube Studio) dan rasm (screenshot)
                  ni yuklang
                </p>
                <div className="input">
                  <input
                    type="file"
                    id="screenshot"
                    {...register('screenshot', { required: true })}
                  />
                </div>
              </label>
              <label htmlFor="password">
                <p>Parol</p>
                <div className="input">
                  <FaRegUser />
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                </div>
              </label>
              <label htmlFor="password_again">
                <p>Parol takroran</p>
                <div className="input">
                  <FaRegUser />
                  <input
                    type="password"
                    id="password_again"
                    placeholder="Parol takroran"
                    {...register('password_again', { required: true })}
                  />
                </div>
              </label>
              <label htmlFor="phone">
                <p>Telefon raqamingiz</p>
                <div className="input">
                  <FaRegUser />
                  <input
                    type="text"
                    id="phone"
                    placeholder="Telefon raqami"
                    {...register('phone', { required: true })}
                  />
                </div>
              </label>
            </div>
            <div className="checkbox">
              <input type="checkbox" {...register('terms', { required: true })} />
              <p>
                Men{" "}
                <a href="https://idonate.uz/assets/terms.pdf">Ommaviy oferta</a>
                ni o'qib chiqdim va qabul qilaman.
              </p>
            </div>
            <button type="submit">Ro'yhatdan o'tish</button>
            <p>
              Murojaat uchun telegram{" "}
              <a href="https://t.me/idonate_admin">@idonate_admin</a>, <br />
              email: <a href="mailto:info@idonate.uz">info@idonate.uz</a>
            </p>
          </form>
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
