export  const routes = {
    home: '/',
    category:{
      hair :"/hair-care",
      lip : "/lip-care",
      eye :"/eye-care",
      face : '/face-care',
      body : "baody-care",
      skin:'skin-care',
      nails : 'nail-care',
      accessories : 'accessories',
      makeup : 'makeup',
      eye : 'eye-care',
    },
    products: {
      list: '/products',
    //   detail: (id: string | number) => `/products/${id}`,
    },
    notfound:'/not-found',
    somethingWrong : "/something-went-wrong",
    contact: '/contact',
    login: '/login',
    register: '/register',
    userInfo:{
      personalInfo:'/personal-info',
      saveAddress: '/save-address',
      yourOrders: '/orders/',
      privacyPolicy: '/privacy-policy',
      termAndCondition: '/term-and-condition',
      refundAndCancellation: '/refund-and-cancellation',
    }
  };
// product-details  