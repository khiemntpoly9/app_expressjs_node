// Category
export const getCategory = async () => {
	let res = await axios.get('http://localhost:5000/api/category');
	return res;
};
getCategory().then((res) => {
	const show_category = document.querySelector('.navbar-nav');
	let arr = res.data;

	Array.from(arr.result).forEach((i) => {
		const item_category = `
            <li class="nav-item">
                <a class="nav-link" href="/cat?id=${i.id}">${i.tenLoai}</a>
            </li>
            `;
		show_category.innerHTML += item_category;
	});
});
