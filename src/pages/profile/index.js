import React, { useState } from "react";
import "./style.css";

function Profile() {
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "Test",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleImg = (event) => {
    const selected = event.target.files[0];
    const imageUrl = URL.createObjectURL(selected);
    setImageUrl(imageUrl);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = new FormData();
    body.append("name", formData.name);
    body.append("currentPassword", formData.currentPassword);
    body.append("newPassword", formData.newPassword);
    body.append("confirmPassword", formData.confirmPassword);
    if (imageUrl) {
      body.append("profileImage", event.target.profileImage.files[0]);
    }

    fetch("YOUR_API_ENDPOINT", {
      method: "POST",
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <p className="title">Profil sozlamalari</p>
      <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h6>Strimer haqida ma'lumotlar</h6>
        <span>Ismi: Test</span>
        <span>Username: test_admin</span>
        <span>Balans: 20 000.00</span>
        <button type="button" className="btn btn_success">
          Pulni yechib olish
        </button>

        <h6 className="input_title">Profil ma'lumotlari</h6>
        <label className="label">Ism</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Test"
        />
        <h6>Rasmni o'zgartirish</h6>
        {imageUrl && (
          <img className="profile_img" src={imageUrl} alt="Your profile" />
        )}
        <input
          accept="image/*"
          onChange={handleImg}
          type="file"
          name="profileImage"
        />

        <h6>Parolni o'zgartirish</h6>
        <label className="label">hozirgi parol</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Hozirgi parol"
        />
        <label className="label">yangi parol</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Yangi parol"
        />
        <label className="label">yangi parol takroran</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Yangi parol takroran"
        />
        <button className="btn btn_indigo" type="submit">
          Saqlash
        </button>
      </form>
    </div>
  );
}

export default Profile;
