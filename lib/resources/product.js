// // get a single product
// const getProduct = (z, bundle) => {
//   const responsePromise = z.request({
//     url: `https://jsonplaceholder.typicode.com/posts/${bundle.inputData.id}`,
//   });
//   return responsePromise
//     .then(response => z.JSON.parse(response.content));
// };

// get a list of products
const listProducts = (z, bundle) => {
  const responsePromise = z.request({
    url: `${bundle.authData.endpoint}/products`,
    params: {
      status: 'published',
      latest: true
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// // find a particular product by name
// const searchProducts = (z, bundle) => {
//   const responsePromise = z.request({
//     url: 'https://jsonplaceholder.typicode.com/posts',
//     params: {
//       query: `name:${bundle.inputData.name}`
//     }
//   });
//   return responsePromise
//     .then(response => z.JSON.parse(response.content));
// };

// // create a product
// const createProduct = (z, bundle) => {
//   const responsePromise = z.request({
//     method: 'POST',
//     url: 'https://jsonplaceholder.typicode.com/posts',
//     body: {
//       name: bundle.inputData.name // json by default
//     }
//   });
//   return responsePromise
//     .then(response => z.JSON.parse(response.content));
// };

module.exports = {
  key: 'product',
  noun: 'Product',

  // get: {
  //   display: {
  //     label: 'Get Product',
  //     description: 'Gets a product.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'id', required: true}
  //     ],
  //     perform: getProduct
  //   }
  // },

  list: {
    display: {
      label: 'New Product',
      description: 'Lists the products.',
      hidden: true
    },
    operation: {
      perform: listProducts
    }
  },

  // search: {
  //   display: {
  //     label: 'Find Product',
  //     description: 'Finds a product by searching.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'name', required: true}
  //     ],
  //     perform: searchProducts
  //   },
  // },

  // create: {
  //   display: {
  //     label: 'Create Product',
  //     description: 'Creates a new product.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'name', required: true}
  //     ],
  //     perform: createProduct
  //   },
  // },

  sample: {
    id: 1,
    name: 'Test'
  },

  outputFields: [
    {key: 'id', label: 'ID'},
    {key: 'name', label: 'Name'}
  ]
};
