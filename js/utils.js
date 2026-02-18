export const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
});

export const maskCurrency = (value) => {
    let v = value.replace(/\D/g, '');
    v = (v / 100).toFixed(2);
    return v === "0.00" ? "" : v;
};

export const toggleBtnLoad = (button, isLoading, loadingText = 'Loading...', originalText) => {
    if(isLoading) {
        button.dataset.originalText = originalText || button.textContent;
        button.disabled = true;
        button.textContent = loadingText;
        button.classList.add('btn-loading');
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || originalText;
        button.classList.remove('btn-loading');
    }
}