// Lấy URL
const params = new URL(window.location.href).searchParams;
// Get ID
let cat_id = params.get('id');
// Div
const show_book = document.querySelector('.admin_show_book');

// async function getUser() {
// 	try {
// 		const response = await axios.get('/user?ID=12345');
// 		console.log(response);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// AJAX Axios
axios
	.get('http://localhost:5000/api/book')
	.then(function (response) {
		// Data
		let data = response.data;
		console.log(data);
		//
		Array.from(data.result).forEach((i) => {
			const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
			const price = new Intl.NumberFormat('vi-VN', config).format(i.gia);
			const item_book = `
					<div class="card col p-3 shadow-sm">
						<div class="img-thumbnail">
							<img class="rounded" src="/${i.urlHinh}" alt="thumbnail"/>
						</div>
						<div class="">
							<a class="nav-link fs-6 fw-semibold" href="/admin/editbook?id=${i.id}">${i.tenSach}</a>
							<span class="text-center">${price}</span>
							<div class="flex">
								<a href="/admin/editbook?id=${i.id}" class="btn btn-primary">Sửa</a>
								<a href="#" onclick="deletebook(${i.id})" class="btn btn-warning">Xoá</a>
							</div>
						</div>
					</div>
				`;
			show_book.innerHTML += item_book;
		});
	})
	.catch(function (error) {
		show_book.innerHTML = `
			<span> Không tìm thấy dữ liệu! </span>
		`;
		console.log(error);
	});

// Xoá
const deletebook = (id) => {
	const ques = confirm(`Bạn có chắc chắn xóa sản phẩm ID: ${id}?`);
	if (ques == false) return;
	axios
		.delete(`http://localhost:5000/api/delete/${id}`)
		.then(function (response) {
			alert('Đã xóa!');
		})
		.catch(function (error) {
			alert('Xoá thất bại!');
		});
	location.reload();
};
