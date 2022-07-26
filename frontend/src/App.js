import './App.css';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Check from "../src/assets/check.svg"
import Arrow from "../src/assets/arrow.svg"
import senhas from "../src/utils/filtered_passwords.txt"
import strongPasswordChecker from "../src/utils/strongPasswordChecker"

const App = () => {
  const [senha, setSenha] = useState("")

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
  } = useForm();

  const sortearSenhas = () => {
    fetch(senhas)
      .then(r => r.text())
      .then(text => {
        const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
        var temp = text.toString().split("\n")
        var randomNum = random(0, temp.length)
        setSenha(temp[randomNum])
      });
  };

  const onSubmit = async (data) => {
    console.log(data);
    const steps = strongPasswordChecker(senha)
    console.log(steps);
    if(steps == data.steps){
      alert("Parabéns, você acertou!!");
      window.location.reload(); 
    } else
      alert("Você errou, tente novamente!")
  };

  useEffect(() => {
    sortearSenhas();
    console.log(senha);
  }, []);

  return (
    <>
      <div className="password">
        <div className="password-title">
          <h1 className="password-h1">Torne a senha forte!</h1>
          <h2 className="password-h2">Sorteamos uma senha dentre as senhas mais utilizadas por usuários. A sua missão é pontuar quantas modificações necessárias para que essa senha se torne mais forte!</h2>
        </div>
        <form className="password-form" onSubmit={handleSubmitCreate(onSubmit)}>
          <div className="password-form-error">
            <span className={"password-form-check-txt"}>Dicas:</span>
            <div>
              <img src={Check} className="password-error-check" alt=">" />
              <span className={"password-form-check-txt"}>Não pode conter 3 caracteres repetidos em sequência</span>
            </div>
            <div>
              <img src={Check} className="password-error-check" alt=">" />
              <span className={"password-form-check-txt"}>De 6 a 20 caracteres</span>
            </div>
            <div>
              <img src={Check} className="password-error-check" alt=">" />
              <span className={"password-form-check-txt"}>Caractere numérico</span>
            </div>
            <div>
              <img src={Check} className="password-error-check" alt=">" />
              <span className={"password-form-check-txt"}>Caractere maiúsculo</span>
            </div>
            <div>
              <img src={Check} className="password-error-check" alt=">" />
              <span className={"password-form-check-txt"}>Caractere minúsculo</span>
            </div>
            <div>
              <h1 className="password-form-check-txt">A senha sorteada foi:</h1>
              <h1 className="password-select">{senha}</h1>
            </div>
          </div>
          <input type="text" placeholder="Modificações necessárias" className="password-input"
            {...registerCreate("steps", {
              required: true,
            })}
          />
          <button className="password-btn-next" type="submit">
            Confirmar!
            <img src={Arrow} className="password-btn-arrow" alt=">" />
          </button>
        </form>
      </div>
    </>
  )
}

export default App;
