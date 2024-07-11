document.addEventListener('DOMContentLoaded', async () => {

    // Get the Form ID
    const formId = document.getElementById('form-id').textContent;


    // Limit Number Inputs to 0-5
    const ratingInputs = document.querySelectorAll('input[type="number"]');
    ratingInputs.forEach(ratingInput => {
        ratingInput.addEventListener('change', () => {
            if(ratingInput.value > 5){
                ratingInput.value = 5;
            }

            if(ratingInput.value < 0){
                ratingInput.value = 0;
            }
        })
    })

    // Submit the Response
    const form = document.getElementById('main-form');
    const submitResponseButton = document.getElementById('submit-response-btn');
    submitResponseButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const targetEndpoint = '/api/responses';
        const result = await fetch(targetEndpoint, {
            method: 'POST',
            body: formData,
        })

        const data = await result.json();

        if(!result.ok){
            alert(data.message);
            throw new Error(data.error);
        }

        window.location.href = `/forms/show/${formId}`;

    })
})