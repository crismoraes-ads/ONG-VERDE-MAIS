document.addEventListener("DOMContentLoaded", () => {
  function setMask(input, maskFn) {
    input.addEventListener("input", () => {
      input.value = maskFn(input.value);
    });
  }

  function maskCPF(v){
    v = v.replace(/\D/g,"");
    v = v.replace(/(\d{3})(\d)/,"$1.$2");
    v = v.replace(/(\d{3})(\d)/,"$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    return v;
  }

  function maskTel(v){
    v = v.replace(/\D/g,"");
    if(v.length <=10){
      v=v.replace(/(\d{2})(\d)/,"($1) $2");
      v=v.replace(/(\d{4})(\d)/,"$1-$2");
    } else {
      v=v.replace(/(\d{2})(\d)/,"($1) $2");
      v=v.replace(/(\d{5})(\d)/,"$1-$2");
    }
    return v;
  }

  function maskCEP(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{5})(\d)/,"$1-$2");
    return v;
  }

  const cpf = document.querySelector("#cpf");
  const tel = document.querySelector("#telefone");
  const cep = document.querySelector("#cep");

  if(cpf) setMask(cpf, maskCPF);
  if(tel) setMask(tel, maskTel);
  if(cep) setMask(cep, maskCEP);

  const form = document.querySelector("#form-cadastro");
  if(form){
    form.addEventListener("submit",(e)=>{
      if(!form.checkValidity()){
        e.preventDefault();
        form.reportValidity();
      } else {
        e.preventDefault();
        alert("Cadastro simulado: formulário válido!");
      }
    });
  }

  // Menu hamburguer toggle
  const menuHamb = document.querySelector(".menu-hamburguer");
  const menuList = document.querySelector("nav ul");
  if(menuHamb){
    menuHamb.addEventListener("click", ()=>{
      menuList.classList.toggle("ativo");
    });
  }
});
