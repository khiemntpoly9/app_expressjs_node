const form = document.querySelector('form');

form.addEventListener('submit', (item) => {
	item.preventDefault();

	const tenSach = document.querySelector('#tenSach');
	const moTa = document.querySelector('#moTa');
	const urlHinh = document.querySelector('#urlHinh');
	const gia = document.querySelector('#gia');
	const idLoai = document.querySelector('#idLoai');
	const anHien = document.querySelector('#anHien');

	const formdata = new FormData(form);
	formdata.append('tenSach', tenSach.value);
	formdata.append('moTa', moTa.value);
	formdata.append('urlHinh', urlHinh.files);
	formdata.append('gia', gia.value);
	formdata.append('idLoai', idLoai.value);
	formdata.append('anHien', anHien.value);

	console.log(formdata);

	axios
		.post('http://localhost:5000/api/addbook', formdata, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		.then(function (res) {
			alert('Thành công!');
			console.log('Thành công!');
		})
		.catch(function (err) {
			alert('Thất bại!');
			console.log('Thất bại!');
		});
});
