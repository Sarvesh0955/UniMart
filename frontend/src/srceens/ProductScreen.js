import {
  parseRequestUrl,
  showLoading,
  hideLoading,
  showMessage,
  rerender,
} from '../utils';
import { getProduct } from '../api';
import { getUserInfo } from '../localStorage';

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    const userInfo = getUserInfo();
    return `
    <div class="content">
    <div class="back-to-result">
    <a href="/#/"><i class="fa fa-arrow-left" aria-hidden="true" style="font-size: 30px; margin-left: 10px; margin-top:13px;"></i></a>
  </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" style="width:400px; height:450px; margin-left:70px; margin-top:22px;">
        </div>
        <div class="details-info" style="margin-left:-100px;">
          <ul>
            <li>
              <h1 style="font-size:50px;">${product.name}</h1>
            </li>
            
            <br>
            <li style="font-size:30px;">
              Price: <strong>₹${product.price}</strong>
            </li>
            <br>
            <li style="font-size:20px;">
              Description:
              <div>
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action" style="margin-top:15px; margin-right:20px;">
            <ul>
              <li>
                Price: ₹${product.price}
              </li>
              <li style="font-size:20px;">
                Status : 
                  ${
                    product.countInStock > 0
                      ? `<span class="success">In Stock</span>`
                      : `<span class="error">Unavailable</span>`
                  }
              </li>
              <li>
                  <button id="add-button" class="fw primary">Add to Cart </div>
            </ul>
        </div>
      </div>
    </div>`;
  },
};
export default ProductScreen;
