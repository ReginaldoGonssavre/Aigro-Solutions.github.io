// Placeholder para login fake (integre com Firebase/Auth0 para produção)
document.getElementById('login-form').addEventListener('submit', function(e){
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  if(email && senha) {
    document.getElementById('login-msg').innerText = "Login simulado! (Integre com Firebase/Auth0 para produção)";
  } else {
    document.getElementById('login-msg').innerText = "Preencha os campos corretamente.";
  }
});