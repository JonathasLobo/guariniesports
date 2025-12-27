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

// Elementos do DOM
const form = document.getElementById('courseForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const message = document.getElementById('message');
const shortDescInput = document.getElementById('shortDesc');
const shortDescCount = document.getElementById('shortDescCount');
const coverImageInput = document.getElementById('coverImage');
const coverImageName = document.getElementById('coverImageName');
const pdfFileInput = document.getElementById('pdfFile');
const pdfFileName = document.getElementById('pdfFileName');

// Contador de caracteres da descrição curta
shortDescInput.addEventListener('input', () => {
    shortDescCount.textContent = shortDescInput.value.length;
});

// Exibir nome do arquivo de imagem selecionado
coverImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        coverImageName.textContent = file.name;
        // Validar tamanho (5MB)
        if (file.size > 5 * 1024 * 1024) {
            showMessage('A imagem deve ter no máximo 5MB', 'error');
            coverImageInput.value = '';
            coverImageName.textContent = 'Nenhum arquivo selecionado';
        }
    }
});

// Exibir nome do arquivo PDF selecionado
pdfFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        pdfFileName.textContent = file.name;
        // Validar tamanho (10MB)
        if (file.size > 10 * 1024 * 1024) {
            showMessage('O PDF deve ter no máximo 10MB', 'error');
            pdfFileInput.value = '';
            pdfFileName.textContent = 'Nenhum arquivo selecionado';
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
                // Progresso do upload (opcional: pode adicionar barra de progresso)
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload: ' + progress + '%');
            },
            (error) => {
                reject(error);
            },
            async () => {
                // Upload completo - obter URL
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
            }
        );
    });
}

// Validar link do YouTube
function isValidYouTubeUrl(url) {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    return pattern.test(url);
}

// Submissão do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Coletar dados do formulário
    const title = document.getElementById('title').value.trim();
    const shortDesc = document.getElementById('shortDesc').value.trim();
    const longDesc = document.getElementById('longDesc').value.trim();
    const videoUrl = document.getElementById('videoUrl').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const coverImage = coverImageInput.files[0];
    const pdfFile = pdfFileInput.files[0];

    // Validar formas de pagamento selecionadas
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

    // Desabilitar botão e mostrar loading
    submitBtn.disabled = true;
    loading.style.display = 'block';
    message.style.display = 'none';

    try {
        // 1. Upload da imagem de capa
        const timestamp = Date.now();
        const coverImagePath = `courses/covers/${timestamp}_${coverImage.name}`;
        const coverImageUrl = await uploadFile(coverImage, coverImagePath);

        // 2. Upload do PDF (se fornecido)
        let pdfUrl = null;
        if (pdfFile) {
            const pdfPath = `courses/pdfs/${timestamp}_${pdfFile.name}`;
            pdfUrl = await uploadFile(pdfFile, pdfPath);
        }

        // 3. Salvar dados no Firestore
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
            // Aqui você pode adicionar o ID do usuário logado
            // creatorId: auth.currentUser.uid
        };

        const docRef = await addDoc(collection(db, 'courses'), courseData);

        // Sucesso
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