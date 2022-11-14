// Lấy URL
const params = new URL(window.location.href).searchParams;
// Get ID
let idbook = params.get('id');
// Book list
const book_edit = async () => {
	let response = await axios.get(`http://localhost:5000/api/book/${idbook}`);
	return response;
};

// Nhập form mới
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
	axios
		.put(`http://localhost:5000/api/book/${idbook}`, formdata, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		.then(function (res) {
			console.log('Sửa thành công!');
		})
		.catch(function (err) {
			console.log('Sửa thất bại!');
		});
});

// Nhập thông tin vào form
book_edit().then((response) => {
	let data = response.data;
	Array.from(data.result).forEach((item) => {
		// date update
		let d = new Date(`${item.capNhat}`);
		const date_update = document.querySelector('#time_show');
		date_update.innerHTML = `<span>Ngày cập nhật: ${d.toLocaleString()}</span>`;
		//
		const nameBook = document.querySelector('#tenSach');
		nameBook.value = `${item.tenSach}`;
		const moTa = document.querySelector('#moTa');
		moTa.value = `${item.moTa}`;
		const gia = document.querySelector('#gia');
		gia.value = `${item.gia}`;
		const idLoai = document.querySelector('#idLoai');
		idLoai.value = `${item.idLoai}`;
		const imgThumbnail = document.querySelector('#thumbnail');
		imgThumbnail.innerHTML = `<img src="/${item.urlHinh}" alt="thumbnail"/>`;
	});
});

// Xoá
let deleteb = document.querySelector('#deletebook');
deleteb.onclick = () => {
	const id = idbook;
	const ques = confirm('Bạn có chắc chắn xóa sản phẩm?');
	if (ques == false) return;
	axios({
		method: 'DELETE',
		url: `http://localhost:5000/api/delete/${id}`,
	})
		.then(function (res) {
			alert('Đã xóa!');
			document.location = 'http://localhost:5000/admin';
		})
		.catch(function (err) {
			alert('Xoá thất bại!');
			document.location = 'http://localhost:5000/admin';
		});
};
