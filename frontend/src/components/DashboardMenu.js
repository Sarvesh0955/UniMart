const DashboardMenu = {
  render: (props) => {
    return `
    <div class="dashboard-menu">
      <ul>

        <li class="${props.selected === 'products' ? 'selected' : ''}">
          <a href="/#/productlist">Products</a>
        </li>
      </ul>
    </div>
    `;
  },
};
export default DashboardMenu;
