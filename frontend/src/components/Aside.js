const Aside = {
  render: async () => {
    return `
   <div class="aside-header">
    <div>SHOP BY CATEGORY</div>
    <button class="aside-close-button" id="aside-close-button">x</button>
  </div>
  <div class="aside-body">
    <ul class="categories">
      <li>
        <a href="/#/?q=Clothing"
          >Clothing
          <span><i class="fa fa-chevron-right"></i></span>
        </a>
      </li>
      <li>
        <a href="/#/?q=Stationary"
          >Stationary
          <span><i class="fa fa-chevron-right"></i></span>
        </a>
      </li> 
      <li>
        <a href="/#/?q=Groceries"
          >Groceries
          <span><i class="fa fa-chevron-right"></i></span>
        </a>
      </li>
      <li>
        <a href="/#/?q=Appliances"
          >Appliances
          <span><i class="fa fa-chevron-right"></i></span>
        </a>
      </li>
    </ul>
  </div>`;
  },
  after_render: async () => {
    document.getElementById('aside-container').classList.remove('open');
    document
      .getElementById('aside-close-button')
      .addEventListener('click', async () => {
        document.getElementById('aside-container').classList.remove('open');
      });
  },
};

export default Aside;
