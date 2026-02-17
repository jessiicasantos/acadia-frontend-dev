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