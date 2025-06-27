document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            alert('Obrigado pelo seu interesse! Em breve, mais informações sobre a Aigro Quantum SaaS.');
        });
    }

    const imageUpload = document.getElementById('imageUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadStatus = document.getElementById('uploadStatus');

    if (uploadBtn && imageUpload && uploadStatus) {
        uploadBtn.addEventListener('click', () => {
            if (imageUpload.files.length > 0) {
                const file = imageUpload.files[0];
                uploadStatus.textContent = `Arquivo selecionado: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
                // Aqui você adicionaria a lógica para enviar o arquivo para um servidor
                // Por exemplo, usando FormData e fetch API
                // Ex:
                // const formData = new FormData();
                // formData.append('image', file);
                // fetch('/upload-endpoint', {
                //     method: 'POST',
                //     body: formData
                // })
                // .then(response => response.json())
                // .then(data => {
                //     uploadStatus.textContent = 'Upload concluído!';
                //     console.log(data);
                // })
                // .catch(error => {
                //     uploadStatus.textContent = 'Erro no upload.';
                //     console.error('Erro:', error);
                // });
            } else {
                uploadStatus.textContent = 'Nenhum arquivo selecionado.';
            }
        });
    }
});
