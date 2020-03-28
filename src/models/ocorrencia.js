const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));


const uf_list = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 
  'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
]

// se novos sintomas forem acrescentados, essa lista deve ser atualizada ou eles serão negados.
const sintomasapre_list = [
  'Febre','Tosse','Dor de garganta','Dificuldade de respirar','Mialgia/artralgia','Diarreia',
  'Náusea/vômitos', 'Cefaleia (dor de cabeça', 'Coriza', 'Irritabilidade/confusão', 'Adinamia (fraqueza)', 'Produção de escarro', 'Calafrios', 'Congestão nasal', 'Congestão conjuntival', 'Dificuldade para deglutir', 'Manchas vermelhas pelo corpo', 'Gânglios linfáticos aumentados',
  'Batimento das asas nasais', 'Outros'
]

const origem_notificacao_list = [
  "Secretaria Estadual de Saúde (vigilância)",
  "Serviço de saúde pública",
  "Serviço de saúde privada",
  "Profissional de saúde autônomo",
  "Laboratório público",
  "Laboratório privado",
  "População",
  "Outra",
]

const sinaisclinicos_list = [
  'Febre',
  'Exsudato faríngeo',
  'Convulsão',
  'Conjuntivite',
  'Coma',
  'Dispneia/Taquipneia',
  'Alteração de ausculta pulmonar',
  'Alteração na radiologia de tórax',
  'Outros',
]

const morbidade_list = [
  'Doença cardiovascular, incluindo hipertensão',
  'Diabetes',
  'Doença hepática',
  'Doença neurológica crônica ou neuromuscular',
  'Imunodeficiência',
  'Infecção pelo HIV',
  'Doença renal',
  'Doença pulmonar crônica',
  'Neoplasia (tumor sólido ou hematológico)',
]

const ocupacao_list = [
  "Profissional de saúde",
  "Estudante da área de saúde",
  "Profissional de laboratório",
  "Trabalha em contato com animais",
  "Outros",
]
						
// TODO: add .required() para os itens obrigatórios
const schema = Joi.object({
    nomepaciente:           Joi.string(),
    nomemae:                Joi.string().allow(''), //,
    idade:                  Joi.number().integer().max(200),
    cpf:                    Joi.string().length(11), //TODO : melhorar essa validação de cpf do lado servidor
    datanascimento:         Joi.date().format('YYYY-MM-DD'),
    datanotificacao:        Joi.date().format('YYYY-MM-DD'),
    cartaosus:              Joi.string().max(40),
    cep:                    Joi.string().max(40),
    endereco:               Joi.string(),
    paisresidencia:         Joi.string().valid("Brasil","Outro"),
    nacionalidade:          Joi.string().valid("Brasileiro","Outro"),
    sexo:                   Joi.string().valid("masculino","feminino"),
    dataprimeirosintoma:    Joi.date().format('YYYY-MM-DD'),
    sintomasapre:           Joi.array().items(Joi.string().valid(...sintomasapre_list)),
    coleta:                 Joi.string().valid('Sim','Nao','Nao sabe'),
    historicoViagem:        Joi.string().valid('Sim','Nao','Nao sabe'),
    contatoConfirmado:      Joi.string().valid('Sim','Nao','Nao sabe'),
    contatoSuspeito:        Joi.string().valid('Sim','Nao','Nao sabe'),
    origemnotificacao:      Joi.string().valid(...origem_notificacao_list),
    estadonotificacao:      Joi.string().valid(...uf_list),
    municipionotificacao:   Joi.string(),
    nomenotificador:        Joi.string(),
    sinaisclinicos:         Joi.array().items(Joi.string().valid(...sinaisclinicos_list)),
    morbidade:              Joi.array().items(Joi.string().valid(...morbidade_list)),
    hospitalizado:          Joi.string().valid('Sim','Nao', 'Nao sabe'),
    SituacaoSaude:          Joi.string().valid('Obito','Cura', 'Sintomatico', 'Ignorado'),
    unidaDeSaude:           Joi.string().valid('Sim','Nao', 'Nao sabe'),
    Ocupacao:               Joi.string().valid(...ocupacao_list),
    contatoAnimal:          Joi.string().valid('Sim','Nao', 'Nao sabe'),
    profocup:               Joi.string(),
    telefone:               Joi.string(),
    email:                  Joi.string().email()
})


const ocorrencia = function (form_data) {
    let _data = form_data

    return {
        save: function (db) {
          console.log(_data) //to debug
          //db.save()...
        },
        data: _data
    }
}

exports.ocorrencia = ocorrencia

exports.validate = function (req, res, next) { 
    //TODO let form_data = req.body
    var obj = req.query.json
        obj = JSON.parse(obj.toString())

    let result = schema.validate(obj)
    if(result.error != undefined){
        console.log(result)
        res.status(501).json({status: 'error', msg: `${error.ValidationError}`})
        return
    }

    res.ocorrencia = ocorrencia(obj)
    next()
}




// var test = {
//   nomepaciente: "João da Silva",
//   nomemae: "",
//   idade: "1",
//   cpf: "12345678901",
//   datanascimento: "0001-01-01",
//   datanotificacao: "0001-01-01",
//   cartaosus: "1",
//   cep: "1",
//   endereco: "1",
//   paisresidencia: "Brasil",
//   nacionalidade: "Brasileiro",
//   sexo: "masculino",
//   dataprimeirosintoma: "1111-11-11",
//   sintomasapre: ["Febre", "Produção de escarro", "Adinamia (fraqueza)", "Irritabilidade/confusão"],
//   coleta: "Sim",
//   historicoViagem: "Sim",
//   contatoConfirmado: "Sim",
//   contatoSuspeito: "Sim",
//   origemnotificacao: "Secretaria Estadual de Saúde (vigilância)",
//   estadonotificacao: "RN",
//   municipionotificacao: "1",
//   nomenotificador: "1",
//   sinaisclinicos: ["Febre"],
//   morbidade: ["Doença hepática"],
//   hospitalizado: "Sim",
//   SituacaoSaude: "Obito",
//   unidaDeSaude: "Sim",
//   Ocupacao: "Profissional de saúde",
//   contatoAnimal: "Sim",
//   profocup: "1",
//   telefone: "12",
//   email: "test@test.com",
//   // campoIntruso: "ljlkjlkjljlkdgljkgkjkl"
// }


// let occ = validate(test)