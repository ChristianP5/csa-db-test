const createResponse = require("../services/createResponse");
const editForm = require("../services/editForm");
const exportFormById = require("../services/exportFormById");
const getAllForms = require("../services/getAllForms");
const getFormById = require("../services/getFormById");
const getResponsesByFormId = require("../services/getResponsesByFormId");
const saveForms = require("../services/saveForm");

const getRootHandler = (request, h) => {
    const data = {
        username: "Bob",
    }
    return h.view('index.ejs', data);
}

const getLostHandler = (request, h) => {
    const response = h.response({
        status: 'fail',
        message: 'Welcome to the Service, but you seem to be Lost!',
    })

    response.code(404);

    return response;
}

const getNewFormsHandler = async (request, h) => {
    return h.view('createForms.ejs');
}

const postFormsHandler = async (request, h) => {
    const { name, question } = request.payload;

    await saveForms(name, question);

    const response = h.response({
        status: 'success',
        message: 'Form Saved Successfully!',
    })

    response.code(201);

    return response;
}

const getFormsHandler = async (request, h) => {

    const forms = await getAllForms();

    const response = h.response({
        status: 'success',
        message: 'All Forms Received',
        data: {
            forms,
        }
    })
    return response;
}

const getFormByIdHandler = async (request, h) => {
    const { id } = request.params;

    const form = await getFormById(id);

    const response = h.response({
        status: 'success',
        message: `Form with id=${id} found!`,
        data: {
            form,
        }
    })

    response.code(200);

    return response;
}

const getShowFormsHandler = async (request, h) => {
    const { id } = request.params;

    // Get Form Information
    const form = await getFormById(id);


    // Get All Responses Associated to Form
    const responses = await getResponsesByFormId(id);


    const data = {
        id: id,
        questions: form.questions,
        name: form.name,
        responses: responses,
    };

    return h.view('showForm.ejs', data);
}

const getEditFormsHandler = async (request, h) => {
    
    const { id } = request.params;

    const form = await getFormById(id);

    const data = {
        id: id,
        questions: form.questions,
        name: form.name,
    };

    return h.view('editForms.ejs', data);
}

const putFormsHandler = async (request, h) => {
    const { name, question } = request.payload;
    const { id } = request.params;

    await editForm(id, name, question);

    const response = h.response({
        status: 'success',
        message: `Form with id=${id} Edited Successfully!`,
    })

    response.code(201);

    return response;
}

const getNewResponsePageHandler = async (request, h) => {
    const { id } = request.params;

    const form = await getFormById(id);

    const data = {
        id: id,
        questions: form.questions,
        name: form.name,
    };

    return h.view('createResponse.ejs', data);
}

const postResponseHandler = async (request, h) => {
    const { formId, department, rating } = request.payload;

    await createResponse(formId, department, rating);

    const response = h.response({
        status: 'success',
        message: 'Response successfully added!',
    })

    response.code(201);

    return response;
}

const getExportFormByIdHandler = async (request, h) => {
    const { id } = request.params;
    const buffer = await exportFormById(id);

    // Return the buffer as a downloadable Excel file
    return h.response(buffer)
    .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    .header('Content-Disposition', 'attachment; filename=data.xlsx');
}

module.exports = {
    getRootHandler, getLostHandler, getNewFormsHandler,
    postFormsHandler, getFormsHandler, getFormByIdHandler,
    getShowFormsHandler, getEditFormsHandler, putFormsHandler,
    getNewResponsePageHandler, postResponseHandler, getExportFormByIdHandler
}