const show_category = document.querySelector('.show-category');
const formcate = document.getElementById('form-cate');
const formcateupdate = document.getElementById('form-cate-edit');
const modal_footer = document.querySelector('.modal-footer');

const url = 'http://localhost:5000/api/category';

class Category {
  constructor(url) {
    this.url = url;
  }

  async getCategory() {
    try {
      let response = await axios.get(`${this.url}`);
      let data = response.data;
      Array.from(data.result).forEach((item) => {
        const item_category = `
          <div class="d-flex justify-content-between mb-2 p-2 rounded border shadow-sm">
            <div class="d-flex align-items-center">
              <span>${item.tenLoai}</span>
            </div>
            <div>
              <button onclick="category.getDetailCategory(${item.id});" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editCategory">
                <ion-icon name="pencil-outline"></ion-icon>
              </button>
              <button onclick="category.deleteCategory(${item.id});" type="button" class="btn btn-danger">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          </div>
		    `;
        show_category.innerHTML += item_category;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addCategory() {
    const tenLoai = document.querySelector('#tenLoai');
    const anHien = document.querySelector('#anHien');

    const formdata = new FormData(formcate);
    formdata.append('tenLoai', tenLoai.value);
    formdata.append('anHien', anHien.value);
    try {
      const post = await axios.post(this.url, formdata, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Thành công');
    } catch (error) {
      console.log(error);
    }
    location.reload();
  }

  async getDetailCategory(cateId) {
    try {
      let response = await axios.get(`${this.url}/${cateId}`);
      let data = response.data;
      Array.from(data.result).forEach((item) => {
        const nameCategory = document.querySelector('#tenLoaiUpdate');
        nameCategory.value = `${item.tenLoai}`;
        const btnsave = `
          <button type="button" onclick="category.updateCategory(${item.id})" class="btn btn-primary d-flex align-items-center" data-bs-dismiss="modal">
            <ion-icon class="me-1" name="save-outline"></ion-icon>Lưu
          </button>
        `;
        modal_footer.innerHTML = btnsave;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategory(cateId) {
    const tenLoaiUpdate = document.querySelector('#tenLoaiUpdate');
    const anHienUpdate = document.querySelector('#anHienUpdate');

    const formdata = new FormData(formcateupdate);
    formdata.append('tenLoai', tenLoaiUpdate.value);
    formdata.append('anHien', anHienUpdate.value);
    try {
      const put = await axios.put(`${this.url}/${cateId}`, formdata, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Thành công');
    } catch (err) {
      console.log(error);
    }
    location.reload();
  }

  deleteCategory(cateId) {
    const ques = confirm(`Bạn có chắc chắn xóa danh mục ID: ${cateId}?`);
    if (ques == false) return;
    try {
      const dlt = axios.delete(`${this.url}/${cateId}`);
      console.log('Đã xoá');
    } catch (error) {
      console.log(error);
    }
    location.reload();
  }
}

const category = new Category(url);
category.getCategory();

// Fix
formcate.addEventListener('submit', (item) => {
  item.preventDefault();
  category.addCategory();
});
