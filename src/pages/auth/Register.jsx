import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import logo from "../../assets/applogo.png";
import "./register.css";
import OtpInput from 'react-otp-input';
import {  useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handlePhoneNumberChange = (event) => {
    setPhone(event.target.value);
  };

  const resendOtp = async () => {
    const tel = localStorage.getItem("tel")

    try {
      const response = await fetch("https://api.frossh.uz/api/auth/resend", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: { phone: tel }
      });
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      const data = await response.json();
      console.log("OTP resent:", data);
      setSeconds(59);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const verifyOtp = async () => {
    const url = "http://192.168.100.35/api/v1/auth/verify";
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    const body = {
      phone: localStorage.getItem("tel"),
      code: otp,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log("OTP verified:", data);
      const token = data.result.token;
      const tokenWithoutId = token.split('|').slice(1).join('|');
      document.cookie = `token=${tokenWithoutId}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
      setSeconds(59);
      setOtp("");
      navigate('/login');
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtp(false);
    }
  };

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
    formData.append('phone', data.phone);
    formData.append('channel_screenshot', data.screenshot[0]);

    try {
      await axios.post(
        "http://192.168.100.35/api/v1/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
          },
        }
      );
      setPhone(data.phone);
      setIsModalVisible(true); // Show the modal on successful submission
      await sendOtp(data.phone); // Send OTP to the user's phone
      localStorage.setItem('tel', data.phone)
      console.log(data.phone);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const sendOtp = async (phone) => {
    const url = "http://192.168.100.35/api/v1/auth/resend";
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    const body = { phone };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log("OTP sent:", data);
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
                {errors.name && <p className="error">Ism kiritilishi shart</p>}
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
                {errors.username && <p className="error">Foydalanuvchi nomi kiritilishi shart</p>}
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
                {errors.channelname && <p className="error">Kanalingiz nomi kiritilishi shart</p>}
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
                {errors.channellink && <p className="error">Kanalingiz havolasi kiritilishi shart</p>}
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
                {errors.email && <p className="error">Email kiritilishi shart</p>}
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
                {errors.about_channel && <p className="error">Kanal haqida ma'lumot kiritilishi shart</p>}
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
                {errors.screenshot && <p className="error">Screenshot yuklash shart</p>}
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
                {errors.password && <p className="error">Parol kiritilishi shart</p>}
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
                {errors.password_again && <p className="error">Parol takroran kiritilishi shart</p>}
              </label>
              <label htmlFor="phone">
                <p>Telefon raqamingiz</p>
                <div className="input">
                  <FaRegUser />
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Telefon raqami"
                    {...register('phone', { required: true })}
                    value={phone}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
                {errors.phone && <p className="error">Telefon raqam kiritilishi shart</p>}
              </label>
            </div>
            <div className="checkbox">
              <input type="checkbox" {...register('terms', { required: true })} />
              <p>
                Men{" "}
                <a href="https://idonate.uz/assets/terms.pdf">Ommaviy oferta</a>
                ni o'qib chiqdim va qabul qilaman.
              </p>
              {errors.terms && <p className="error">Shartlarni qabul qilish shart</p>}
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
      <Rodal  className="rodal" visible={isModalVisible}  width={650} height={350}  onClose={handleCloseModal}>
        <div className="modal-content">
          <h2>Tasdiqlash kodini kiriting </h2>
          <OtpInput
           
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span style={{ margin: "0 5px" }}>  </span>}
            renderInput={(props, index) => (
              <input
                {...props}
                key={index}
                style={{
                  width: "80px",
                  height: "80px",
                  textAlign: "center",
                  border: `2px solid ${seconds === 0 || otp === false ? "red" : "black"}`,
                  borderRadius: "15px",
                  margin: "0 5px",
                  fontSize: "23px",
                }}
              />
            )}
          />
          <div className="qaytayuborish">
            <span style={seconds === 0 ? { color: "red" } : { color: "black" }}>{formatTime(seconds)}</span>
            {seconds === 0 && (
              <span className="calumsms">
                <span onClick={resendOtp} className="qayta">Kod kelmadimi? <i>Qayta yuborish</i></span>
              </span>
            )}
          </div>
          <button onClick={verifyOtp}>Tasdiqlash</button>
        </div>
      </Rodal>
    </div>
  );
};

export default Register;
