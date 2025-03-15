import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

import axios from "axios";

//async thunk to fetch product by collection and optional filters

export const fetchProductsByFilters = createAsyncThunk("products/fetchByFilters" , async({collection , 
  size,
  color,
  gender,
  minPrice,
  maxPrice,
  sortBy,
  search,
  category,
  material,
  brand,
  limit,
})=>{
  const query = new URLSearchParams();
  if(collection) query.append("collection" , collection);
  if(size) query.append("collection" ,size);
  if(color) query.append("collection" ,color);
  if(gender) query.append("collection" , gender);
  if(minPrice) query.append("collection" , minPrice);
  if(maxPrice) query.append("collection" , maxPrice);
  if(sortBy) query.append("collection" , sortBy);
  if(search) query.append("collection" , search);
  if(category) query.append("collection" , category);
  if(material) query.append("collection" , material);
  if(brand) query.append("collection" , brand);
  if(limit) query.append("collection" , limit);


  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()} `);
  return response.data;
});

//async thunk to fetch a single prodct by id

export const fetchProductDetails = createAsyncThunk("products/fetchProductDetails" , async ({id}) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`);
  return response.data;
})

//async thunk to update product
export const updateProduct = createAsyncThunk("products/updateProduct" , async ({id , productData}) => {
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}` , productData , {
    headers:{
      Authorization:`Bearer ${localStorage.getItem("userToken")}`,
    }
  });
  return response.data;
});

//async think for fetch similar producsts
export const fetchSimilarProducts = createAsyncThunk("products/fetchSimilarProducts" , async({id})=>{
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`);

  return response.data;
})

//setup the slice for managing product related state
const productSlice = createSlice({
  name:"products",
  initialState:{
    products:[],
    selectedProduct:null,//store the details fo single product
    similarProducts:[],
    loading:false,
    error:null,
    filters:{
      category:"",
      size:"",
      color:"",
      gender:"",
      brand:"",
      minPrice:"",
      maxPrice:"",
      sortBy:"",
      search:"",
      material:"",
      collection:"",
    }


  },
  reducers:{
    setFilters:(state , action)=>{
      state.filters = {...state.filters , ...action.payload};
    },
      clearFilters : (state)=>{
      state.filters = {
        category:"",
        size:"",
        color:"",
        gender:"",
        brand:"",
        minPrice:"",
        maxPrice:"",
        sortBy:"",
        search:"",
        material:"",
        collection:"",
      };
    }, 
  },
  extraReducers:(builder) => {
    builder
    //handle fetching products with filter
    .addCase(fetchProductsByFilters.pending , (state)=>{
      state.loading = true;
      state.error=null;
    })
    .addCase(fetchProductsByFilters.fulfilled , (state , action)=>{
      state.loading = false;
      state.products=Array.isArray(action.payload) ? action.payload : [];
    })
    .addCase(fetchProductsByFilters.rejected , (state ,action)=>{
      state.loading = false;
      state.error=action.error.message;
    })
    //for fetch product details

    .addCase(fetchProductDetails.pending , (state)=>{
      state.loading = true;
      state.error=null;
    })
    .addCase(fetchProductDetails.fulfilled , (state , action)=>{
      state.loading = false;
      state.selectedProduct=action.payload
    })
    .addCase(fetchProductDetails.rejected , (state ,action)=>{
      state.loading = false;
      state.error=action.error.message;
    })

    //handle updating product
    .addCase(updateProduct.pending , (state)=>{
      state.loading = true;
      state.error=null;
    })
    .addCase(updateProduct.fulfilled , (state , action)=>{
      state.loading = false;
      const updatedProduct = action.payload;
      const index = state.products.findIndex((product)=>product._id === updatedProduct._id);
      if(index!==-1){
        state.products[index] = updatedProduct;
      }
    })
    .addCase(updateProduct.rejected , (state ,action)=>{
      state.loading = false;
      state.error=action.error.message;
    })

    //add case to fetch similar products
    .addCase(fetchSimilarProducts.pending , (state)=>{
      state.loading = true;
      state.error=null;
    })
    .addCase(fetchSimilarProducts.fulfilled , (state , action)=>{
      state.loading = false;
      state.products=action.payload;
    })
    .addCase(fetchSimilarProducts.rejected , (state ,action)=>{
      state.loading = false;
      state.error=action.error.message;
    })
  }
});

export const {setFilters , clearFilters } = productSlice.actions;
export default productSlice.reducer;