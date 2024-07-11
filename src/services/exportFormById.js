const mongoose = require('mongoose');
const ExcelJS = require('exceljs');

const Forms = require('../models/Forms');
const Response = require('../models/Response');

const exportFormById = async (id) => {
    mongoose.connect(process.env.MONGODB_URL);

    // Expected JSON Data Format
    /*
    const data = [
        {
            formId: "...",
            responseId: "Response's ID",
            questions: ["Question 1", "Question n"],
            ratings: ["Response's Rating 1", "Response's Rating n"],
            createdAt: "Response's createdAt",
        }
    ]
    */
    
    // Get the Forms Information
    const forms = await Forms.find( {_id: id} );
    const form = forms[0];

    const questions = form.questions;
    const formId = id;

    // Get the Responses Information
    const responses = await Response.find( {form: id} ).sort( { createdAt: -1 } );

    // ExcelJS Starts Here -----------------------

    // JSON Object
    const data = []

    responses.forEach(response => {
        const item = {
            formId: formId,
            responseId: response._id,
            department: response.department,
            createdAt: response.createdAt,
        }

        for(let i = 0; i < questions.length; i++){
            item[`question${i+1}`] = questions[i];
            item[`rating${i+1}`] = response.ratings[i];
        }

        data.push(item);
    })

    console.log(data);

    // Worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${form.name} Responses`);

    // Columns
    const columns = [
        { header: 'Form ID', key: 'formId' },
        { header: 'Department', key: 'department' },
        { header: 'Response ID', key: 'responseId' },
        { header: 'Time', key: 'createdAt' },
    ];
    
    for(let i = 0; i<questions.length; i++){
        const questionColumn = {
            header: `Question ${i+1}`,
            key: `question${i+1}`,
        }

        columns.push(questionColumn);

        const ratingColumn = {
            header: `Rating ${i+1}`,
            key: `rating${i+1}`,
        }

        columns.push(ratingColumn);
    }

    worksheet.columns = columns;

    // Add Rows
    console.log(columns);

    data.forEach(row => {
        worksheet.addRow(row);
    })

    // Generate a buffer from the workbook
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;
    
}

module.exports = exportFormById;