// Lấy URL
const params = new URL(document.location).searchParams;
// Get ID
let cat_id = params.get('id');
// Book list
const book_cat = async () => {
  if (cat_id == null) {
    let response = await axios.get(`http://localhost:5000/api/book`);
    return response;
  } else {
    let response = await axios.get(`http://localhost:5000/api/bookcate/${cat_id}`);
    return response;
  }
};
book_cat().then((response) => {
  const show_book = document.querySelector('.showbook');
  let data = response.data;

  Array.from(data.result).forEach((i) => {
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
    const price = new Intl.NumberFormat('vi-VN', config).format(i.gia);
    const item_book = `
			<div class="card col p-3 shadow-sm">
				<div class="img-thumbnail">
					<img class="rounded" src="/${i.urlHinh}" alt="thumbnail"/>
				</div>
				<div class="d-flex flex-column box-item">
					<a class="nav-link fs-6 fw-semibold" href="http://localhost:5000/sach/detail?id=${i.id}">${i.tenSach}</a>
					<span class="text-center">${price}</span>
					<button class="btn btn-danger">Chọn sách</button>
				</div>
			</div>
		`;
    show_book.innerHTML += item_book;
  });
});
