import { getProducts } from '../api';
import { parseRequestUrl } from '../utils';

const HomeScreen = {
  render: async () => {
    const { value } = parseRequestUrl();
    const products = await getProducts({ searchKeyword: value });
    if (products.error) {
      return `<div class="error">${products.error}</div>`;
    }

    return `
    <!-- <section>
        <div id="containerSlider">
            <div id="slidingImage"> <img src="/images/img3.jpg" alt="image3" style="height: 320px;"> </div>
            <div id="slidingImage"> <img src="/images/img1.jpg" alt="image1" style="height: 320px;"> </div>
            <div id="slidingImage"> <img src="/images/img2.jpg" alt="image2" style="height: 320px;"> </div>
            <div id="slidingImage"> <img src="/images/img4.jpg" alt="image4"> </div>
        </div>
    </section> -->
     <div class="section collection">
        <div class="containerr">

            <div class="containerr_card">
              <div class="collection-card" style="background-image: url('/images/collection1.jpg')">
                <h2 class="h4 card-title"><b > Clothing </b> </h2>

                <a href="#" class="btn btn-secondary">
                    <a href="clothing.html">Explore All</a>
                  <!-- <span>Explore All</span> -->

                  <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                </a>
              </div>
            </div>

            <div class="containerr_card">
                <div class="collection-card" style="background-image: url('/images/collection2.jpg')">
                  <h2 class="h4 card-title" ><b > Stationary </b> </h2>
  
                  <a href="#" class="btn btn-secondary">
                    <a href="stationary.html">Explore All</a>
                    <!-- <span>Explore All</span> -->
  
                    <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                  </a>
                </div>
              </div>
              <div class="containerr_card">
                <div class="collection-card" style="background-image: url('/images/collection3.jpg')">
                  <h2 class="h4 card-title"><b > Groceries </b> </h2>
  
                  <a href="#" class="btn btn-secondary">
                    <a href="groceries.html">Explore All</a>
                    <!-- <span>Explore All</span> -->
  
                    <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                  </a>
                </div>
              </div>

              <div class="containerr_card">
                <div class="collection-card" style="background-image: url('/images/collection4.jpg')">
                  <h2 class="h4 card-title"><b > Appliances </b> </h2>
  
                  <a href="#" class="btn btn-secondary">
                    <a href="appliances.html">Explore All</a>
                    <!-- <span>Explore All</span> -->
  
                    <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                  </a>
                </div>
              </div>

        </div>
    </div>
    
        <ul class="products">
      ${products
        .map(
          (product) => `
      <li>
        <div class="product">
          <a href="/#/product/${product._id}">
            <img src="${product.image}" alt="${product.name}" style="height:250px;">
          </a>
        <div class="product-name">
          <a href="/#/product/1">
            ${product.name}
          </a>
        </div>
        
        <div class="product-brand">
          ${product.brand}
        </div>
        <div class="product-price">
        ₹${product.price}
        </div>
        </div>
      </li>
      `
        )
        .join('\n')}
    </ul>
    `;
  },
};

export default HomeScreen;
