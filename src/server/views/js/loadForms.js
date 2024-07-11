document.addEventListener('DOMContentLoaded', async () => {
    
    // Get All Forms from Database
    const targetEndpoint = "/api/forms";
    const result = await fetch(targetEndpoint, {
        method: 'GET',
    });

    const data = await result.json();

    const forms = data.data.forms;
    console.log(forms);

    // Display All Forms
    const formsList = document.getElementById('forms-list');

    forms.forEach(form => {
        const name = form.name;
        const createdAt = form.createdAt;
        const id = form._id;

        console.log(id);

        const item = document.createElement('div');
        item.classList.add("row", "mt-2");

        item.innerHTML = `
            <div class="col">
            <div class="card p-4 ps-6">
                <h3>${name}</h3>
                <p>${createdAt}</p>
                <p>Responses : ...</p>
                <div class="container">
                <a href="/forms/show/${id}" class="btn btn-primary">See more</a>
                </div>
            </div>
            </div>
        `;

        formsList.appendChild(item);
    })

})