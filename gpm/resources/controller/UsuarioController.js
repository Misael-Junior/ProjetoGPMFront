/**
 * Controlador de Usuário AgularJS.
 */

var UsuarioControllerApp = angular.module("UsuarioControllerApp",[]);

UsuarioControllerApp.controller("UsuarioController", function($scope, $window, $http){
	
	$scope.id       = null;
	$scope.nome     = null;
	$scope.login    = null;
	$scope.senha    = null;
	$scope.rsenha   = null;
	$scope.telefone = null;

	
	$scope.cadastrarUsuario = function(){
		
		function validaCadastro(evt){}
		
		if($scope.senha == $scope.rsenha){
			
			var usuarioModel      = new Object();
			usuarioModel.nome     = $scope.nome;
			usuarioModel.email    = $scope.email;
			usuarioModel.senha    = $scope.senha;
			usuarioModel.telefone = $scope.telefone;
			usuarioModel.perfil   = $scope.perfil;
			
			var response = $http.post("cadastrar", usuarioModel);
			
		}else{
			
			$window.alert("Senhas não Conferem !!! ");
			$scope.senha  = null;
			$scope.rsenha = null;
		}
		
		response.success(function(data, status, headers, config){
			
			if(data.nome != null){
				
				$window.alert("Cadastro de " + data.nome + " Realizado com Sucesso !!!");
				
				$scope.nome     = null;
				$scope.email    = null;
				$scope.senha    = null;
				$scope.rsenha   = null;
				$scope.telefone = null;
				
			}else{
				
				$window.alert("Erro ao Tentar Cadastrar. Campos Obrigatórios estão Vazios !!!");
			}			
		});
		
		response.error(function(data, status, headers, config){
			
			$window.alert(data);
			
		});
	}
	
	$scope.alterarUsuario = function(){
		
		var usuarioModel      = new Object();
		usuarioModel.nome     = $scope.nome;
		usuarioModel.email    = $scope.email;
		usuarioModel.senha    = $scope.senha;
		usuarioModel.telefone = $scope.telefone;
		usuarioModel.perfil   = $scope.perfil;
		
		var response = $http.post("alterar", usuarioModel);
		
		response.success(function(data, status, headers, config){
			
			if(data.codigo == 1){
				
				$window.alert("Cadastro de " + data.nome + " Alterado com Sucesso !!!");
				
				$scope.id       = null;
				$scope.nome     = null;
				$scope.login    = null;
				$scope.senha    = null;
				$scope.rsenha   = null;
				$scope.telefone = null;
								
				window.location.href = "../alterar";
			
			}else{
				
				$window.alert("Erro ao Tentar Alterar Cadastro de Usuário. Campos Obrigatórios Vazios !!!");
			}
		});
		
		response.error(function(data, status, headers, config){
			
			$window.alert(data);
			
		});
		
	}
	
	$scope.excluir = function(id){
		
		if($window.confirm("Deseja Realmente Excluir esse Registro ???")){
			
			var response = $http['delete']("excluir/+id");
			response.success(function(data, status, headers, config){
				
				$scope.init();
				
			});
			
			response.error(function(data, status, headers, config){
				
				$window.alert(data);
				
			});
		}
	}
	
	$scope.usuarios = new Array();
	
	$scope.init = function(){
		
		var response = $http.get("listar");
		
		response.success(function(data, status, headers, config){
			
			$scope.usuarios = data;
			
		});
		
		response.error(function(data, status, headers, config){
			
			$window.alert(data);
			
		});
		
	}
	
	/* Método de Validação dos Campos */
	function validaCadastro(evt){
		var nome = document.getElementById('nome');
		var email = document.getElementById('email');
		var senha = document.getElementById('senha');
		var senha2 = document.getElementById('rsenha');
		var sexo = document.getElementById('perfil');
		var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		var contErro = 0;
	 
	 
		/* Validação do campo nome */
		caixa_nome = document.querySelector('.msg-nome');
		if(nome.value == ""){
			caixa_nome.innerHTML = "Favor preencher o Nome";
			caixa_nome.style.display = 'block';
			contErro += 1;
		}else{
			caixa_nome.style.display = 'none';
		}
	 
		/* Validação do campo email */
		caixa_email = document.querySelector('.msg-email');
		if(email.value == ""){
			caixa_email.innerHTML = "Favor preencher o E-mail";
			caixa_email.style.display = 'block';
			contErro += 1;
		}else if(filtro.test(email.value)){
			caixa_email.style.display = 'none';
		}else{
			caixa_email.innerHTML = "Formato do E-mail inválido";
			caixa_email.style.display = 'block';
			contErro += 1;
		}	
	 
		/* Validação do campo senha */
		caixa_senha = document.querySelector('.msg-senha');
		if(senha.value == ""){
			caixa_senha.innerHTML = "Favor preencher a Senha";
			caixa_senha.style.display = 'block';
			contErro += 1;
		}else if(senha.value.length < 6){
			caixa_senha.innerHTML = "Favor preencher a Senha com o mínimo de 6 caracteres";
			caixa_senha.style.display = 'block';
			contErro += 1;
		}else{
			caixa_senha.style.display = 'none';
		}
	 
		/* Validação do campo repita a senha */
		caixa_senha2 = document.querySelector('.msg-senha2');
		if(senha2.value == ""){
			caixa_senha2.innerHTML = "Favor preencher o campo Repita a Senha";
			caixa_senha2.style.display = 'block';
			contErro += 1;
		}else if(senha2.value.length < 6){
			caixa_senha2.innerHTML = "Favor preencher o campo Repita a Senha com o mínimo de 6 caracteres";
			caixa_senha2.style.display = 'block';
			contErro += 1;
		}else{
			caixa_senha2.style.display = 'none';
		}
		
		/* Validação do campo perfil */
		caixa_sexo = document.querySelector('.msg-perfil');
		if(sexo.value == ""){
			caixa_sexo.innerHTML = "Favor preencher o perfil";
			caixa_sexo.style.display = 'block';
			contErro += 1;
		}else{
			caixa_sexo.style.display = 'none';
		}
	 
		if(contErro > 0){
			evt.preventDefault();
		}
	}
	
});


