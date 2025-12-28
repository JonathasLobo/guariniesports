// Importar Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

// ⚠️ CONFIGURAÇÃO DO FIREBASE - SUBSTITUA COM SUAS CREDENCIAIS
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Elementos do DOM (comuns para ambas as páginas)
const form = document.getElementById('courseForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const message = document.getElementById('message');
const shortDescInput = document.getElementById('shortDesc');
const shortDescCount = document.getElementById('shortDescCount');
const coverImageInput = document.getElementById('coverImage');
const coverImageName = document.getElementById('coverImageName');

// Detectar qual página está sendo carregada
const isMentoriaPage = document.getElementById('mentoriaDays') !== null;
const isCoursePage = document.getElementById('videoUrl') !== null;

// ==================== FUNÇÕES COMUNS ====================

// Contador de caracteres da descrição curta
shortDescInput.addEventListener('input', () => {
    shortDescCount.textContent = shortDescInput.value.length;
});

// Exibir nome do arquivo de imagem selecionado
coverImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        coverImageName.textContent = file.name;
        if (file.size > 5 * 1024 * 1024) {
            showMessage('A imagem deve ter no máximo 5MB', 'error');
            coverImageInput.value = '';
            coverImageName.textContent = 'Nenhum arquivo selecionado';
        }
    }
});

// Função para exibir mensagens
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
}

// Função para fazer upload de arquivo
async function uploadFile(file, path) {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload: ' + progress + '%');
            },
            (error) => {
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
            }
        );
    });
}

// Validar link do YouTube (apenas para página de curso)
function isValidYouTubeUrl(url) {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    return pattern.test(url);
}

// ==================== LÓGICA ESPECÍFICA DA PÁGINA DE MENTORIA ====================

if (isMentoriaPage) {
    const priceInput = document.getElementById('price');
    const mentoriaDaysInput = document.getElementById('mentoriaDays');
    const totalValueDiv = document.getElementById('totalValue');
    const totalPriceSpan = document.getElementById('totalPrice');
    const gameModeSelect = document.getElementById('gameMode');
    const otherGameInput = document.getElementById('otherGame');
    const platformContact = document.getElementById('platformContact');
    const platformInfo = document.getElementById('platformInfo');

    // Mostrar campo "Outro jogo" quando selecionado
    gameModeSelect.addEventListener('change', () => {
        if (gameModeSelect.value === 'Outro') {
            otherGameInput.style.display = 'block';
            otherGameInput.required = true;
        } else {
            otherGameInput.style.display = 'none';
            otherGameInput.required = false;
            otherGameInput.value = '';
        }
    });

    // Mostrar campo de contato quando selecionar qualquer plataforma
    document.querySelectorAll('input[name="platform"]').forEach(radio => {
        radio.addEventListener('change', () => {
            platformContact.style.display = 'block';
            platformInfo.style.display = 'block';
            platformContact.required = true;
            
            const platform = radio.value;
            if (platform === 'Discord') {
                platformContact.placeholder = 'Ex: seu_usuario#1234 ou link do servidor Discord';
            } else if (platform === 'Zoom') {
                platformContact.placeholder = 'Ex: Link da sala Zoom ou ID da reunião';
            } else if (platform === 'Google Meet') {
                platformContact.placeholder = 'Ex: Link do Google Meet';
            } else {
                platformContact.placeholder = 'Ex: Link ou contato para realizar a mentoria';
            }
        });
    });

    // Calcular valor total automaticamente
    function calculateTotal() {
        const pricePerHalfHour = parseFloat(priceInput.value) || 0;
        const sessionDurationInput = document.getElementById('sessionDuration');
        const sessionDuration = parseInt(sessionDurationInput.value) || 0;
        const numberOfSessions = parseInt(mentoriaDaysInput.value) || 0;
        
        if (pricePerHalfHour > 0 && sessionDuration > 0 && numberOfSessions > 0) {
            const halfHourBlocks = sessionDuration / 30;
            const pricePerSession = pricePerHalfHour * halfHourBlocks;
            const total = pricePerSession * numberOfSessions;
            
            totalPriceSpan.textContent = total.toFixed(2).replace('.', ',');
            totalValueDiv.style.display = 'block';
        } else {
            totalValueDiv.style.display = 'none';
        }
    }

    priceInput.addEventListener('input', calculateTotal);
    mentoriaDaysInput.addEventListener('change', calculateTotal);
    document.getElementById('sessionDuration').addEventListener('change', calculateTotal);

    // Submissão do formulário de MENTORIA
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const shortDesc = document.getElementById('shortDesc').value.trim();
        const longDesc = document.getElementById('longDesc').value.trim();
        let gameMode = document.getElementById('gameMode').value;
        const otherGame = document.getElementById('otherGame').value.trim();
        const sessionDuration = document.getElementById('sessionDuration').value;
        const mentoriaDays = document.getElementById('mentoriaDays').value;
        const availableHours = document.getElementById('availableHours').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const coverImage = coverImageInput.files[0];
        const platformContactValue = document.getElementById('platformContact').value.trim();

        if (gameMode === 'Outro' && otherGame) {
            gameMode = otherGame;
        }

        const mentoriaType = document.querySelector('input[name="mentoriaType"]:checked')?.value;
        const platform = document.querySelector('input[name="platform"]:checked')?.value;

        const availability = [];
        document.querySelectorAll('#seg, #ter, #qua, #qui, #sex, #sab, #dom').forEach(checkbox => {
            if (checkbox.checked) availability.push(checkbox.value);
        });

        const paymentMethods = [];
        document.querySelectorAll('#pix, #mercadopago, #stripe, #paypal').forEach(checkbox => {
            if (checkbox.checked) paymentMethods.push(checkbox.value);
        });

        // Validações
        if (!title || !shortDesc || !longDesc || !gameMode || !sessionDuration || !mentoriaDays || !availableHours || !price || !coverImage) {
            showMessage('Por favor, preencha todos os campos obrigatórios', 'error');
            return;
        }

        if (!mentoriaType) {
            showMessage('Selecione o tipo de mentoria (Individual ou Grupo)', 'error');
            return;
        }

        if (!platform) {
            showMessage('Selecione a plataforma da call', 'error');
            return;
        }

        if (!platformContactValue) {
            showMessage('Informe o link ou contato da plataforma escolhida', 'error');
            return;
        }

        if (availability.length === 0) {
            showMessage('Selecione pelo menos um dia de disponibilidade', 'error');
            return;
        }

        if (paymentMethods.length === 0) {
            showMessage('Selecione pelo menos uma forma de recebimento', 'error');
            return;
        }

        if (price <= 0) {
            showMessage('O valor por sessão deve ser maior que zero', 'error');
            return;
        }

        // Calcular valor total baseado na duração das sessões
        const pricePerHalfHour = price;
        const halfHourBlocks = parseInt(sessionDuration) / 30;
        const pricePerSession = pricePerHalfHour * halfHourBlocks;
        const totalValue = pricePerSession * parseInt(mentoriaDays);

        submitBtn.disabled = true;
        loading.style.display = 'block';
        message.style.display = 'none';

        try {
            const timestamp = Date.now();
            const coverImagePath = `mentorias/covers/${timestamp}_${coverImage.name}`;
            const coverImageUrl = await uploadFile(coverImage, coverImagePath);

            const mentoriaData = {
                title: title,
                shortDescription: shortDesc,
                longDescription: longDesc,
                gameMode: gameMode,
                mentoriaType: mentoriaType,
                platform: platform,
                platformContact: platformContactValue,
                sessionDuration: parseInt(sessionDuration),
                numberOfSessions: parseInt(mentoriaDays),
                pricePerHalfHour: price,
                pricePerSession: pricePerSession,
                totalValue: totalValue,
                availability: availability,
                availableHours: availableHours,
                coverImageUrl: coverImageUrl,
                paymentMethods: paymentMethods,
                createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, 'mentorias'), mentoriaData);

            showMessage(`✅ Mentoria cadastrada com sucesso! ID: ${docRef.id}`, 'success');
            form.reset();
            coverImageName.textContent = 'Nenhum arquivo selecionado';
            shortDescCount.textContent = '0';
            totalValueDiv.style.display = 'none';
            otherGameInput.style.display = 'none';
            platformContact.style.display = 'none';
            platformInfo.style.display = 'none';

        } catch (error) {
            console.error('Erro ao cadastrar mentoria:', error);
            showMessage(`❌ Erro ao cadastrar mentoria: ${error.message}`, 'error');
        } finally {
            submitBtn.disabled = false;
            loading.style.display = 'none';
        }
    });
}

// ==================== LÓGICA ESPECÍFICA DA PÁGINA DE CURSO ====================

if (isCoursePage) {
    const pdfFileInput = document.getElementById('pdfFile');
    const pdfFileName = document.getElementById('pdfFileName');

    // Exibir nome do arquivo PDF selecionado
    pdfFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            pdfFileName.textContent = file.name;
            if (file.size > 10 * 1024 * 1024) {
                showMessage('O PDF deve ter no máximo 10MB', 'error');
                pdfFileInput.value = '';
                pdfFileName.textContent = 'Nenhum arquivo selecionado';
            }
        }
    });

    // Submissão do formulário de CURSO
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const shortDesc = document.getElementById('shortDesc').value.trim();
        const longDesc = document.getElementById('longDesc').value.trim();
        const videoUrl = document.getElementById('videoUrl').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const coverImage = coverImageInput.files[0];
        const pdfFile = pdfFileInput.files[0];

        const paymentMethods = [];
        document.querySelectorAll('.payment-option input[type="checkbox"]:checked').forEach(checkbox => {
            paymentMethods.push(checkbox.value);
        });

        // Validações
        if (!title || !shortDesc || !longDesc || !videoUrl || !price || !coverImage) {
            showMessage('Por favor, preencha todos os campos obrigatórios', 'error');
            return;
        }

        if (paymentMethods.length === 0) {
            showMessage('Selecione pelo menos uma forma de recebimento', 'error');
            return;
        }

        if (!isValidYouTubeUrl(videoUrl)) {
            showMessage('Por favor, insira um link válido do YouTube', 'error');
            return;
        }

        if (price <= 0) {
            showMessage('O valor do curso deve ser maior que zero', 'error');
            return;
        }

        submitBtn.disabled = true;
        loading.style.display = 'block';
        message.style.display = 'none';

        try {
            const timestamp = Date.now();
            const coverImagePath = `courses/covers/${timestamp}_${coverImage.name}`;
            const coverImageUrl = await uploadFile(coverImage, coverImagePath);

            let pdfUrl = null;
            if (pdfFile) {
                const pdfPath = `courses/pdfs/${timestamp}_${pdfFile.name}`;
                pdfUrl = await uploadFile(pdfFile, pdfPath);
            }

            const courseData = {
                title: title,
                shortDescription: shortDesc,
                longDescription: longDesc,
                videoUrl: videoUrl,
                coverImageUrl: coverImageUrl,
                pdfUrl: pdfUrl,
                price: price,
                paymentMethods: paymentMethods,
                createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, 'courses'), courseData);

            showMessage(`✅ Curso cadastrado com sucesso! ID: ${docRef.id}`, 'success');
            form.reset();
            coverImageName.textContent = 'Nenhum arquivo selecionado';
            pdfFileName.textContent = 'Nenhum arquivo selecionado';
            shortDescCount.textContent = '0';

        } catch (error) {
            console.error('Erro ao cadastrar curso:', error);
            showMessage(`❌ Erro ao cadastrar curso: ${error.message}`, 'error');
        } finally {
            submitBtn.disabled = false;
            loading.style.display = 'none';
        }
    });
}