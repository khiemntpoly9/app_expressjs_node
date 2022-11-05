// Lấy URL
const params = new URL(document.location).searchParams;
// Get ID
let cat_id = params.get('id');
// Book list
export const book_cat = async () => {
	let response = await axios.get(`http://localhost:5000/api/category/${cat_id}`);
	return response;
};
book_cat().then((response) => {
	const show_book = document.querySelector('.showbook');
	let data = response.data;

	Array.from(data.result).forEach((i) => {
		const item_book = `
            <a class="nav-link" href="#">${i.tenSach}</a>
		`;
		show_book.innerHTML += item_book;
	});
});
