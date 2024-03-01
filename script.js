async function start(){
    await getPrevisao();
    await getAddressByCep();
}

async function getAddressByCep(){
    const cep = document.getElementById('cep').value;
    try{
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        console.log(data);
        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('localidade').value = data.localidade;
    } catch (error){
        alert(error.message);
    }
}

async function getPrevisao(){
    const lat = document.getElementById('latitude').value;
    const long = document.getElementById('longitude').value;
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`);
        const data = await response.json();
        console.log(data);

        // Verifica se a resposta da API contém dados de temperatura
        if(data.hourly && Array.isArray(data.hourly.temperature_2m) && data.hourly.temperature_2m.length > 0) {
            const ultimaTemperatura = data.hourly.temperature_2m[data.hourly.temperature_2m.length - 1];
            document.getElementById('resposta').value = `${ultimaTemperatura}ºC`;
        } else {
            document.getElementById('resposta').value = 'Dados de temperatura não encontrados.';
        }
    } catch(error) {
        alert(error.message);
    }
}