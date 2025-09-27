console.log("=== FILLTIME JS SIMPLES CARREGADO ===");

document.addEventListener("DOMContentLoaded", () => {
    console.log("=== DOM CARREGADO - INICIANDO FILLTIME SIMPLES ===");
    
    const fileInput = document.getElementById("modalUserPhoto");
    const fileInputText = document.getElementById("fileInputText");
    const imagePreview = document.getElementById("imagePreview");
    const previewImage = document.getElementById("previewImage");
    const imagePlaceholder = document.getElementById("imagePlaceholder");

    console.log("Elementos encontrados:", {
        fileInput: !!fileInput,
        fileInputText: !!fileInputText,
        imagePreview: !!imagePreview,
        previewImage: !!previewImage,
        imagePlaceholder: !!imagePlaceholder
    });

    if (fileInput) {
        console.log("Adicionando listener ao fileInput");
        fileInput.addEventListener("change", function(e) {
            console.log("File input changed!");
            const file = e.target.files[0];
            console.log("Arquivo selecionado:", file);
            
            if (file) {
                if (!file.type.startsWith('image/')) {
                    alert("Por favor, selecione apenas arquivos de imagem.");
                    fileInput.value = "";
                    return;
                }
                
                console.log("Arquivo é uma imagem, processando...");
                
                if (fileInputText) {
                    fileInputText.textContent = file.name;
                    fileInputText.classList.add("has-file");
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    console.log("Imagem carregada pelo FileReader");
                    
                    if (imagePlaceholder) {
                        imagePlaceholder.style.display = "none";
                        console.log("Placeholder escondido");
                    }
                    
                    if (previewImage) {
                        previewImage.src = e.target.result;
                        previewImage.alt = "Preview da imagem selecionada";
                        previewImage.style.display = "block";
                        previewImage.style.visibility = "visible";
                        previewImage.style.opacity = "1";
                        console.log("Imagem configurada:", previewImage.src.substring(0, 50) + "...");
                    }
                    
                    if (imagePreview) {
                        imagePreview.style.display = "block";
                        imagePreview.style.visibility = "visible";
                        imagePreview.style.opacity = "1";
                        console.log("Preview container mostrado");
                    }
                    
                    const removeBtn = imagePreview ? imagePreview.querySelector('.image-preview-remove') : null;
                    if (removeBtn) {
                        removeBtn.style.display = "flex";
                        removeBtn.style.visibility = "visible";
                        removeBtn.style.opacity = "1";
                        console.log("Botão de remover configurado");
                    }
                };
                
                reader.onerror = function(e) {
                    console.error("Erro ao carregar imagem:", e);
                    alert("Erro ao carregar a imagem. Tente novamente.");
                    
                    if (imagePlaceholder) {
                        imagePlaceholder.style.display = "flex";
                    }
                    if (previewImage) {
                        previewImage.style.display = "none";
                    }
                };
                
                console.log("Iniciando leitura do arquivo...");
                reader.readAsDataURL(file);
            } else {
                console.log("Nenhum arquivo selecionado");
                if (fileInputText) {
                    fileInputText.textContent = "Nenhum arquivo escolhido";
                    fileInputText.classList.remove("has-file");
                }
                if (imagePreview) {
                    imagePreview.style.display = "none";
                }
                if (previewImage) {
                    previewImage.src = "";
                }
            }
        });
    } else {
        console.error("fileInput não encontrado!");
    }

    window.removeImagePreview = function() {
        console.log("Removendo preview da imagem");
        if (fileInput) fileInput.value = "";
        if (fileInputText) {
            fileInputText.textContent = "Nenhum arquivo escolhido";
            fileInputText.classList.remove("has-file");
        }
        if (imagePreview) {
            imagePreview.style.display = "none";
            imagePreview.style.visibility = "hidden";
            imagePreview.style.opacity = "0";
        }
        if (previewImage) {
            previewImage.src = "";
            previewImage.alt = "";
            previewImage.style.display = "none";
        }
        
        if (imagePlaceholder) {
            imagePlaceholder.style.display = "flex";
        }
        
        const removeBtn = imagePreview ? imagePreview.querySelector('.image-preview-remove') : null;
        if (removeBtn) {
            removeBtn.style.display = "none";
            removeBtn.style.visibility = "hidden";
            removeBtn.style.opacity = "0";
        }
    };
});
