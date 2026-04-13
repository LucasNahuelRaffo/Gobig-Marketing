import mammoth from 'mammoth';
import fs from 'fs';

mammoth.extractRawText({path: "./public/legal.docx"})
    .then(function(result){
        var text = result.value; // The raw text
        var messages = result.messages;
        console.log(text);
    })
    .catch(function(err){
        console.log(err);
    });
