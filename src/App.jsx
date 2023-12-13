import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const products = productsFromServer.map((product) => {
    const category
    = categoriesFromServer.find(cat => cat.id === product.categoryId);
    const user = usersFromServer.find(usr => usr.id === category.ownerId);

    return {
      ...product,
      category: category.title,
      categoryIcon: category.icon,
      userName: user.name,
      userSex: user.sex,
      userId: user.id,
    };
  }).filter(product => selectedUserId === null
    || product.userId === selectedUserId);

  const handleFilterChange = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>
            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => handleFilterChange(null)}
                className={!selectedUserId ? 'is-active' : ''}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  key={user.id}
                  href="#/"
                  onClick={() => handleFilterChange(user.id)}
                  className={selectedUserId === user.id ? 'is-active' : ''}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr data-cy="Product" key={product.id}>
                  <td
                    className="has-text-weight-bold"
                    data-cy="ProductId"
                  >
                    {product.id}
                  </td>
                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    <span className="icon-text">
                      <span className="icon">
                        {product.categoryIcon}
                      </span>
                      <span>
                        -&nbsp;
                        {product.category}
                      </span>
                    </span>
                  </td>
                  <td
                    data-cy="ProductUser"
                    className={product.userSex === 'm'
                      ? 'has-text-link' : 'has-text-danger'}
                  >
                    {product.userName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
