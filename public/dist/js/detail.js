// Lấy URL
const params = new URL(window.location.href).searchParams;
// Get ID
let idbook = params.get('id');
// Div
const show_book = document.querySelector('.show_detail_book');

// AJAX Axios
axios
  .get(`http://localhost:5000/api/book/${idbook}`)
  .then(function (response) {
    // Data
    let data = response.data;
    //
    Array.from(data.result).forEach((i) => {
      const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
      const price = new Intl.NumberFormat('vi-VN', config).format(i.gia);
      // date update
      let d = new Date(`${i.capNhat}`);
      const item_book = `
					<div class="card col p-3">
						<div class="d-flex flex-column flex-md-row">
							<div class="img-thumbnail  mb-3 me-md-3">
								<img class="rounded w-100" src="/${i.urlHinh}" alt="thumbnail"/>
							</div>
							<div class="d-flex flex-column gap-3">
								<span>Ngày cập nhật: ${d.toLocaleString()}
								<a class="nav-link fs-6 fw-semibold" href="#">${i.tenSach}</a>
								<div>${price}</div>
								<div>
									<span>
										${i.moTa}
									</span>
								</div>
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
