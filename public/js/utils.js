export const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
});

export const maskCurrency = (value) => {
    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/\D/g, "")) / 100 : value;

    if(isNaN(numericValue)) return "$ 0.00";

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);

    const spaceFormatted = formatter.replace('$', '$ ');

    return spaceFormatted;
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