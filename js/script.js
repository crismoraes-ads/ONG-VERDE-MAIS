document.addEventListener('DOMContentLoaded', function(){
  // Menu hambúrguer
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');

  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navUl.classList.toggle('active');
    });
  }

  // Máscaras de formulário (CPF, Telefone, CEP)
  function setMask(input, maskFn){
    input.addEventListener('input', () => input.value = maskFn(input.value));
  }

  function maskCPF(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{3})(\d)/,"$1.$2");
    v=v.replace(/(\d{3})(\d)/,"$1.$2");
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    return v;
  }

  function maskTel(v){
    v=v.replace(/\D/g,"");
    if(v.length<=10){ v=v.replace(/(\d{2})(\d)/,"($1) $2"); v=v.replace(/(\d{4})(\d)/,"$1-$2"); }
    else{ v=v.replace(/(\d{2})(\d)/,"($1) $2"); v=v.replace(/(\d{5})(\d)/,"$1-$2"); }
    return v;
  }

  function maskCEP(v){ v=v.replace(/\D/g,""); v=v.replace(/(\d{5})(\d)/,"$1-$2"); return v;}

  const cpf = document.querySelector("#cpf");
  const tel = document.querySelector("#telefone");
  const cep = document.querySelector("#cep");

  if(cpf) setMask(cpf, maskCPF);
  if(tel) setMask(tel, maskTel);
  if(cep) setMask(cep, maskCEP);

  // Formulário de cadastro
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
});
