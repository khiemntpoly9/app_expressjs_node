const btnRegister = document.querySelector('#regbtn');

const url = 'http://localhost:5000/api/register';

const regFunction = async () => {
  const username = document.querySelector('#username');
  const ho = document.querySelector('#ho');
  const ten = document.querySelector('#ten');
  const email = document.querySelector('#email');
  const gt = document.querySelector('#gioitinh');
  const pass = document.querySelector('#password');
  const repass = document.querySelector('#repassword');

  if (pass.value === repass.value) {
    const formdata = new FormData();
    formdata.append('username', username.value);
    formdata.append('ho', ho.value);
    formdata.append('ten', ten.value);
    formdata.append('email', email.value);
    formdata.append('gioitinh', gt.value);
    formdata.append('password', pass.value);

    try {
      const post = await axios.post(url, formdata, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Tạo tài khoản thành công!');
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Mật khẩu không trùng khớp!');
  }
};

btnRegister.addEventListener('click', regFunction);
