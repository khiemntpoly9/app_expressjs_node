const btnLogin = document.querySelector('#btnLogin');

const url = 'http://localhost:5000/api/login';

const loginFunction = async () => {
  const username = document.querySelector('#username');
  const pass = document.querySelector('#password');

  const formdata = new FormData();
  formdata.append('username', username.value);
  formdata.append('password', pass.value);

  try {
    const post = await axios.post(url, formdata, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Đăng nhập thành công!');
  } catch (error) {
    console.log(error);
  }
};

btnLogin.addEventListener('click', loginFunction);
