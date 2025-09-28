console.log("=== TESTE JS CARREGADO ===");

document.addEventListener("DOMContentLoaded", function() {
    console.log("=== DOM CARREGADO ===");
    
    const fileInput = document.getElementById("modalUserPhoto");
    console.log("FileInput encontrado:", !!fileInput);
    
    if (fileInput) {
        fileInput.addEventListener("change", function(e) {
            console.log("Arquivo selecionado!");
            const file = e.target.files[0];
            console.log("Arquivo:", file);
            
            if (file) {
                console.log("Tipo do arquivo:", file.type);
                console.log("Nome do arquivo:", file.name);
                console.log("Tamanho do arquivo:", file.size);

                const reader = new FileReader();
                reader.onload = function(e) {
                    console.log("FileReader carregou a imagem");
                    
                    const previewImage = document.getElementById("previewImage");
                    const imagePreview = document.getElementById("imagePreview");
                    
                    console.log("PreviewImage encontrado:", !!previewImage);
                    console.log("ImagePreview encontrado:", !!imagePreview);
                    
                    if (previewImage) {
                        previewImage.src = e.target.result;
                        console.log("Src da imagem definido");
                    }
                    
                    if (imagePreview) {
                        imagePreview.style.display = "block";
                        console.log("Preview mostrado");
                    }
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
});




