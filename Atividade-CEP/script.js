document.getElementById("formCEP").addEventListener("submit", async function (e) {
    e.preventDefault();

    const cep = document.getElementById("cep").value.replace(/\D/g, "");
    const resultado = document.getElementById("resultado");
    const carregando = document.getElementById("carregando");

    if (cep.length !== 8) {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
        return;
    }

    resultado.classList.add("esconder");
    carregando.classList.remove("esconder");

    try {
        const respostaAPI = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await respostaAPI.json();

        carregando.classList.add("esconder");

        if (dados.erro) {
            alert("CEP não encontrado!");
            return;
        }

        document.getElementById("logradouro").textContent = dados.logradouro;
        document.getElementById("bairro").textContent = dados.bairro;
        document.getElementById("localidade").textContent = dados.localidade;
        document.getElementById("uf").textContent = dados.uf;
        document.getElementById("cepResultado").textContent = dados.cep;

        resultado.classList.remove("esconder");

    } catch (error) {
        carregando.classList.add("esconder");
        alert("Erro ao consultar o CEP. Tente novamente.");
        console.error(error);
    }
});
