const axios = require('axios');
const fs = require('fs');
const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;
const url = require('url');

axios.defaults.headers.common['Cookie'] = 'G_ENABLED_IDPS=google; _ga=GA1.3.358351611.1615029154; ASP.NET_SessionId=kplkn402q4sqjxvsoumxib1e; G_AUTHUSER_H=1';





async function getStudent() {

    const res = await axios.get('https://ap.greenwich.edu.vn/Course/Groups.aspx?group=1458');
    const dom = new JSDOM(res.data).window.document;

    var students = [];

    for (const tr of dom.querySelectorAll('#ctl00_mainContent_divStudents tbody tr')) {
        students.push({
            avatar: new URL(tr.children.item(1).querySelector('img').src, 'https://ap.greenwich.edu.vn/Course').href,
            email: tr.children.item(2).textContent.trim(),
            code: tr.children.item(3).textContent.trim(),
            firstname: tr.children.item(4).textContent.trim(),
            lastname: tr.children.item(6).textContent.trim()
        });

    }   

    console.log(students)

    for (const student of students) {
        const imgData = await axios.get(student.avatar, {
            responseType: 'arraybuffer'
        });

        fs.writeFileSync('G:/test-exp/public/uploads/trainees/' + student.email + '.jpg', imgData.data);
        student.avatar = student.email + '.jpg'
    }

    return await students;
}


async function getTopic() {

    const res = await axios.get('https://ap.greenwich.edu.vn/Grade/StudentTranscript.aspx');
    const dom = new JSDOM(res.data).window.document;

    var topics = [];

    for (const tr of dom.querySelectorAll('#ctl00_mainContent_divGrade > table:first-child tbody tr')) {
        topics.push({
            topic_code: tr.children.item(3).textContent.trim(),
            topic_name: tr.children.item(5).textContent.trim(),
            credit: 15,
            semester: tr.children.item(3).textContent.trim(),
            slot: 40,
            is_active: 1
        });
    }
    return topics;
}

module.exports.getStudent = getStudent();
module.exports.getTopic = getTopic();
