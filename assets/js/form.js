    var json={}

    function vericaCep(obj,checkbox){
        montarReq(obj,checkbox)//mantendo o padrao de montagem (precisa ser revisto)
        //gambiarra do cep aqui
        //https://viacep.com.br/ws/20765171/json/
        let cep = new XMLHttpRequest();
            let url = 'https://viacep.com.br/ws/'+obj.value+'/json/'
            cep.open("get", url, false) 
            cep.send();
            valid=JSON.parse(cep.responseText)
            //cast json
            if(valid.logradouro){
                e=document.getElementById("endereco")
                e.value= valid.logradouro +","+valid.bairro+"," + valid.uf
                e.disabled=true
                montarReq(e,checkbox)//mantendo o padrao de montagem (precisa ser revisto)
            }
    }

    function verificaPreenchimmento(json){
        if(json.hasOwnProperty('datanotificacao') && json.hasOwnProperty('cartaosus') && json.hasOwnProperty('cpf') && json.hasOwnProperty('nomepaciente') && json.hasOwnProperty('sexo') && json.hasOwnProperty('datanascimento') && json.hasOwnProperty('idade') && json.hasOwnProperty('nomemae') && json.hasOwnProperty('nacionalidade') && json.hasOwnProperty('paisresidencia') && json.hasOwnProperty('endereco') && json.hasOwnProperty('cep') && json.hasOwnProperty('dataprimeirosintoma') && json.hasOwnProperty('sintomasapre') && json.hasOwnProperty('sinaisclinicos') && json.hasOwnProperty('morbidade') && json.hasOwnProperty('hospitalizado') && json.hasOwnProperty('SituacaoSaude') && json.hasOwnProperty('coleta') && json.hasOwnProperty('historicoViagem') && json.hasOwnProperty('contatoSuspeito') && json.hasOwnProperty('contatoConfirmado') && json.hasOwnProperty('unidaDeSaude') && json.hasOwnProperty('Ocupacao') && json.hasOwnProperty('contatoAnimal') && json.hasOwnProperty('origemnotificacao') && json.hasOwnProperty('estadonotificacao') && json.hasOwnProperty('municipionotificacao') && json.hasOwnProperty('nomenotificador') && json.hasOwnProperty('profocup') && json.hasOwnProperty('telefone') && json.hasOwnProperty('email')){
            return true
        }
        else{
            return false 
        }
    }

    function montarReq(obj , checkbox){
        if(checkbox){ 
            if (!json[obj.name]){
                    json[obj.name]=[obj.value]
            }else{
                    if (obj.checked){
                        json[obj.name].push(obj.value)
                    }else{
                        json[obj.name].splice(json[obj.name].indexOf(obj.value),1)
                    }
            }
        }
        else{
            json[obj.name]=obj.value
        }
    }

    function jsonSend(){

    if(verificaPreenchimmento(json)){
    var xhr = new XMLHttpRequest();
        var url = 'http://'+window.location.host+"/api/ocorrencias?json="+JSON.stringify(json)
        xhr.open("POST", url, false) 
        xhr.send();
        if(xhr.responseText=="200"){
            alert("Respostas salvas!")
            window.location.href="/"
        }else if(xhr.responseText=="401"){
            alert('Ocorreu um problema, tente novamente')
        }
        }else{
            alert("O formulário não está completamente preenchido. Por favor insira as informações faltantes.")
        }
    }