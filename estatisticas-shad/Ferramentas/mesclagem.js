document.addEventListener('DOMContentLoaded', () => {
    console.log('Script carregado!'); // Debug inicial

    // Elementos do DOM
    const file1Input = document.getElementById('file1');
    const file2Input = document.getElementById('file2');
    const mergeBtn = document.getElementById('merge-btn');
    const resultSection = document.getElementById('result-section');
    const jsonOutput = document.getElementById('json-output');
    const downloadBtn = document.getElementById('download-btn');
    const totalMatches = document.getElementById('total-matches');
    const matchesList = document.getElementById('matches-list');
    const errorAlert = document.getElementById('error-alert');

    // Variáveis para armazenar os dados
    let file1Data = null;
    let file2Data = null;

    // Função para mostrar erros no console e na interface
    function showError(message) {
        console.error(message); // Mostra no console
        errorAlert.textContent = message;
        errorAlert.classList.remove('hidden');
        setTimeout(() => {
            errorAlert.classList.add('hidden');
        }, 5000);
    }

    // Verifica se os arquivos estão prontos para mesclagem
    function checkFilesReady() {
        mergeBtn.disabled = !(file1Data && file2Data);
        console.log('Arquivo 1:', file1Data ? 'Carregado' : 'Não carregado');
        console.log('Arquivo 2:', file2Data ? 'Carregado' : 'Não carregado');
    }

    // Valida a estrutura do JSON
    function isValidStructure(data) {
        if (!data) {
            console.error('Dados não definidos');
            return false;
        }
        
        if (!Array.isArray(data)) {
            console.error('Dados não são um array:', typeof data);
            return false;
        }
        
        const isValid = data.every(match => {
            const hasBasicProps = match.matchDate && match.matchType && match.winnerTeam && match.defeatedTeam;
            const hasScores = match.winnerTeam.totalScore !== undefined && match.defeatedTeam.totalScore !== undefined;
            return hasBasicProps && hasScores;
        });

        if (!isValid) {
            console.error('Estrutura inválida encontrada nos dados:', data);
        }
        
        return isValid;
    }

    // Manipulador de arquivo 1
    function handleFile1Upload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                file1Data = JSON.parse(event.target.result);
                console.log('Arquivo 1 carregado:', file1Data);
                document.getElementById('file1-info').textContent = `✅ ${file.name} - ${file1Data.length} partida(s)`;
                checkFilesReady();
            } catch (error) {
                showError('Erro ao ler o Arquivo 1. Certifique-se de que é um JSON válido.');
                console.error('Erro no Arquivo 1:', error);
            }
        };
        reader.onerror = () => {
            showError('Erro ao ler o Arquivo 1');
            console.error('Erro no FileReader do Arquivo 1');
        };
        reader.readAsText(file);
    }

    // Manipulador de arquivo 2
    function handleFile2Upload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                file2Data = JSON.parse(event.target.result);
                console.log('Arquivo 2 carregado:', file2Data);
                document.getElementById('file2-info').textContent = `✅ ${file.name} - ${file2Data.length} partida(s)`;
                checkFilesReady();
            } catch (error) {
                showError('Erro ao ler o Arquivo 2. Certifique-se de que é um JSON válido.');
                console.error('Erro no Arquivo 2:', error);
            }
        };
        reader.onerror = () => {
            showError('Erro ao ler o Arquivo 2');
            console.error('Erro no FileReader do Arquivo 2');
        };
        reader.readAsText(file);
    }

    // Função de mesclagem principal
    function mergeFiles() {
        console.log('Botão mesclar clicado!');
        console.log('Dados do Arquivo 1:', file1Data);
        console.log('Dados do Arquivo 2:', file2Data);

        try {
            if (!file1Data || !file2Data) {
                throw new Error('Por favor, carregue ambos os arquivos antes de mesclar.');
            }

            if (!isValidStructure(file1Data)) {
                throw new Error('O Arquivo 1 não tem a estrutura esperada de partidas Pokémon Unite.');
            }
            
            if (!isValidStructure(file2Data)) {
                throw new Error('O Arquivo 2 não tem a estrutura esperada de partidas Pokémon Unite.');
            }

            console.log('Iniciando mesclagem...');
            const mergedData = [...file1Data, ...file2Data];
            console.log('Dados mesclados (antes da ordenação):', mergedData);

            mergedData.sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
            console.log('Dados mesclados (após ordenação):', mergedData);

            displayResults(mergedData);
            resultSection.classList.remove('hidden');
            console.log('Mesclagem concluída com sucesso!');

        } catch (error) {
            showError(error.message);
            console.error('Erro na mesclagem:', error);
        }
    }

    // Exibe os resultados na tela
    function displayResults(data) {
        console.log('Exibindo resultados...');
        totalMatches.textContent = data.length;
        matchesList.innerHTML = '';

        data.forEach((match, index) => {
            const matchElement = document.createElement('div');
            matchElement.className = 'bg-white border border-gray-200 rounded-lg p-3 shadow-sm';
            
            const winnerTeam = match.winnerTeam;
            const defeatedTeam = match.defeatedTeam;
            
            matchElement.innerHTML = `
                <div class="flex justify-between items-start mb-1">
                    <span class="font-medium text-gray-700">Partida ${index + 1}</span>
                    <span class="text-sm text-gray-500">${match.matchDate}</span>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-green-600 font-medium">
                        Vencedor: ${winnerTeam.totalScore} pts
                    </div>
                    <div class="text-red-600 font-medium">
                        Derrotado: ${defeatedTeam.totalScore} pts
                    </div>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                    ${match.matchType}
                </div>
            `;
            
            matchesList.appendChild(matchElement);
        });
        
        jsonOutput.textContent = JSON.stringify(data, null, 2);
    }

    // Download do arquivo mesclado
    function downloadMergedFile() {
        try {
            const mergedData = jsonOutput.textContent;
            if (!mergedData || mergedData.trim() === '') {
                throw new Error('Nenhum dado para baixar. Execute a mesclagem primeiro.');
            }

            const blob = new Blob([mergedData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'partidas_mescladas.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('Download realizado com sucesso!');
        } catch (error) {
            showError(error.message);
            console.error('Erro ao baixar:', error);
        }
    }

    // Configuração dos event listeners
    file1Input.addEventListener('change', handleFile1Upload);
    file2Input.addEventListener('change', handleFile2Upload);
    mergeBtn.addEventListener('click', mergeFiles);
    downloadBtn.addEventListener('click', downloadMergedFile);

    console.log('Event listeners configurados!');
});