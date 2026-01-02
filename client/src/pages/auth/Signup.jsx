import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profilePicture: null,
  });

  function handleChange(eventObject) {
    const { name, value, file } = eventObject.target;
    
  }
  return <div>signup page</div>;
};

export default Signup;
