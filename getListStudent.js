


const axios = require('axios');
const fs = require('fs');
const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;
const url = require('url');

axios.defaults.headers.common['Cookie'] = 'G_ENABLED_IDPS=google; _ga=GA1.3.358351611.1615029154; ASP.NET_SessionId=4cfcvr1qp3fxpnrpagnfbqgq; G_AUTHUSER_H=1';

 



async function getStudent() {

    const res = await axios.get('https://ap.greenwich.edu.vn/Course/Groups.aspx?group=1458');
    const dom = new JSDOM(res.data).window.document;

    var students = [];

    for (const tr of dom.querySelectorAll('#ctl00_mainContent_divStudents tbody tr')) {
        students.push({
            avatar: new URL(tr.children.item(1).querySelector('img').src, 'https://ap.greenwich.edu.vn/Course').href,
            username: tr.children.item(2).textContent.trim(),
            code: tr.children.item(3).textContent.trim(),
        });
       
    }

    for (const student of students) {
        const imgData = await axios.get(student.avatar, {
            responseType: 'arraybuffer'
        });

        fs.writeFileSync('./images/' + student.username + '.jpg', imgData.data);
        student.avatar = student.username + '.jpg'
    }

    return await students;
}


async function getTopic() {

    const res = await axios.get('https://ap.greenwich.edu.vn/Grade/StudentTranscript.aspx');
    const dom = new JSDOM(res.data).window.document;

    var topics = [];
 
    for (const tr of dom.querySelectorAll('#ctl00_mainContent_divGrade tbody tr')) {
        topics.push({
            //  topic_code: tr.children.item(4).textContent.trim(),
            // topic_name: tr.children.item(6).textContent.trim(),
            // credit: tr.children.item(7).textContent.trim(),
            // semester: tr.children.item(3).textContent.trim()
        });
    }
    console.log(res.data)
   return await topics;
}

module.exports.getStudent = getStudent();
module.exports.getTopic = getTopic();
