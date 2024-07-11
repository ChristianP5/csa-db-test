document.addEventListener('DOMContentLoaded', async () => {
    
    const form = document.getElementById('main-form');
    const formNameInput = document.getElementById('name-input');
    let questionCount = 0;

    // Submit Form Button
    const createFormButton = document.getElementById('create-form-btn');
    createFormButton.addEventListener('click', async (e) => {
        e.preventDefault();

        if(questionCount < 1){
            alert('Please add a Question to the form');
            throw new Error("No Questions were added to the Forms");
        }

        if(formNameInput.value === ""){
            alert('Please add a Form Name');
            throw new Error("Form Name field is empty!");
        }

        const formData = new FormData(form);

        const targetEndpoint = '/api/forms';
        const result = await fetch(targetEndpoint, {
            method: 'POST',
            body: formData,
        })

        const data = await result.json();

        if(!result.ok){
            alert(data.message);
            throw new Error(data.error);
        }

        window.location.href = '/';

    })

    // Add Question Button
    const addQuestionButton = document.getElementById('add-question-btn');
    addQuestionButton.addEventListener('click', (e) => {
        e.preventDefault();

        const questionsList = document.getElementById('questions-list');
        questionCount += 1;

        const item = document.createElement('div');
        item.classList.add('form-floating');
        item.innerHTML = 
        `
        <input
            type="text"
            name="question"
            id="question-${questionCount}"
            class="form-control mt-2"
            placeholder="question-${questionCount}"
          />
          <label for="question-${questionCount}" class="form-label">Insert Question</label>
          <button id="delete-question-btn" class="btn btn-danger btn-sm">Remove Question</button>
        `;

        questionsList.appendChild(item);
        updateDeleteQuestionButtons();
    })

    // Delete Question Button
    const updateDeleteQuestionButtons = () => {
        const deleteQuestionButtons = document.querySelectorAll('.btn.btn-danger.btn-sm');
        deleteQuestionButtons.forEach(deleteQuestionButton => {
            deleteQuestionButton.addEventListener('click', async (event) => {
                event.preventDefault();
                
                const pressedButton = event.target;

                // Delete the Question from the Questions List
                const item = pressedButton.parentElement;

                const questionsList = document.getElementById('questions-list');
                questionsList.removeChild(item);
                questionCount -= 1;
            })
        })
    }

    updateDeleteQuestionButtons();
})