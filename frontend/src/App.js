import './App.css';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Check from "../src/assets/check.svg"
import CheckFailed from "../src/assets/failed.svg"
import Arrow from "../src/assets/arrow.svg"

const App = () => {
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
  } = useForm();

  const onSubmitCreate = async (data) => {
    console.log(data);
  };

  const handleBlur = async (event) => {
    const password = event.currentTarget.value;
    setValidLength(false);
    if (password.length >= 8) {
      setValidLength(true);
    }
    setHasNumber(false);
    if ((/\d/).test(password) === true) {
      setHasNumber(true);
    }
    setUpperCase(false);
    if ((/[A-Z]/).test(password) === true) {
      setUpperCase(true);
    }
    setLowerCase(false);
    if ((/[a-z]/).test(password) === true) {
      setLowerCase(true);
    }
  };

  return (
    <>
      <div className="password">
        <div className="password-title">
          <h1 className="password-h1">Torne a senha forte!</h1>
          <h2 className="password-h2">Sorteamos uma senha dentre as senhas mais utilizadas por usuários. A sua missão é fazer modificações de forma que essa senha se torne mais forte!</h2>
        </div>
        <form className="password-form" onSubmit={handleSubmitCreate(onSubmitCreate)}>
          <div className="password-form-error">
            {/* <div>
              <img src={validLength ? Check : CheckFailed} className="password-error-check" alt=">" />
              <span className={validLength ? "password-form-check-txt" : "password-form-error-txt"}>Mínimo 8 caracteres</span>
            </div>
            <div>
              <img src={hasNumber ? Check : CheckFailed} className="password-error-check" alt=">" />
              <span className={hasNumber ? "password-form-check-txt" : "password-form-error-txt"}>Caractere numérico</span>
            </div>
            <div>
              <img src={upperCase ? Check : CheckFailed} className="password-error-check" alt=">" />
              <span className={upperCase ? "password-form-check-txt" : "password-form-error-txt"}>Caractere maiúsculo</span>
            </div>

            <div>
              <img src={lowerCase ? Check : CheckFailed} className="password-error-check" alt=">" />
              <span className={lowerCase ? "password-form-check-txt" : "password-form-error-txt"}>Caractere minúsculo</span>
            </div> */}
          </div>
          <input type="text" placeholder="Modifique a senha" className="password-input"
            {...registerCreate("password", {
              onBlur: (e) => handleBlur(e),
              required: true,
              minLength: {
                value: 8,
                message:
                  "",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~])[A-Za-z\d`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]{8,}$/,
                message:
                  "",
              },
            })}
          />
          <button className="password-btn-next" type="submit">
            Confirmar
            <img src={Arrow} className="password-btn-arrow" alt=">" />
          </button>
        </form>
      </div>
    </>
  )
}

export default App;
