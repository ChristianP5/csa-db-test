document.addEventListener('DOMContentLoaded', async () => {
    const formId = document.getElementById('form-id').textContent;
    
    // Export Feature
    const exportButton = document.getElementById('export-btn');
    exportButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const targetEndpoint = `/api/forms/${formId}/export`;
        const result = await fetch(targetEndpoint, {
            method: 'GET',
        })

        if(!result.ok){
            throw new Error("Error with Endpoint!");
        }

        const blob = await result.blob();

        // Create a temporary anchor element
        const a = document.createElement("a");
        a.style.display = "none";

        // Create a URL for the blob and set it as href of the anchor
        const url = window.URL.createObjectURL(blob);
        a.href = url;

        // Set the filename for the download
        a.download = `form-${formId}-responses.xlsx`;

        // Append the anchor to the body and click it programmatically
        document.body.appendChild(a);
        a.click();

        // Clean up: remove the anchor from the body and revoke the URL
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    })
})