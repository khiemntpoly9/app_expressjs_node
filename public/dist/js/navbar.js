// Category
const getCategory = async () => {
	let res = await axios.get('http://localhost:5000/api/category');
	return res;
};
getCategory().then((res) => {
	const show_category = document.querySelector('.getcate');
	let arr = res.data;

	Array.from(arr.result).forEach((i) => {
		const item_category = `
			<li>
				<a class="dropdown-item" href="/sach/cat?id=${i.id}">${i.tenLoai}</a>
			</li>
            `;
		show_category.innerHTML += item_category;
	});
});
