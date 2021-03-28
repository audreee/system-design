import http from 'k6/http';

export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 100 },
  ],
  thresholds: { http_req_duration: ['avg<100', 'p(95)<200'] },
  noConnectionReuse: true,
};

// GET questions
export default function () {
  http.get('http://localhost:3000/qa/questions?product_id=120983');
}

// // GET answers
// export default function () {
//   http.get('http://localhost:3000/qa/questions/73625/answers');
// }

// // POST questions
// export default function () {
//   var url = 'http://localhost:3000/qa/questions';
//   var payload = JSON.stringify({
//     body: 'test question test question',
//     name: 'test question',
//     email: 'user@user.com',
//     product_id: '44444'
//   });
//   var params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   http.post(url, payload, params);
// }

// // POST answer
// export default function () {
//   var url = 'http://localhost:3000/qa/questions/12345/answers';
//   var payload = JSON.stringify({
//     body: 'test test test test test test',
//     name: 'user user',
//     email: 'user@user.com',
//   });
//   var params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   http.post(url, payload, params);
// }