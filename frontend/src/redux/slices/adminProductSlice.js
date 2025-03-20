import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`

const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`

//async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchProducts" , async()=>{
  const response = await axios.get(`${API_URL}/api/admin/products` , {
    headers:{
      Authorization:USER_TOKEN
    }
  })
  return response.data;
})

// async function to create a new products
export const createProduct = createAsyncThunk("adminProducts/createProduct" , async(productData)=>{
  const response = await axios.post(`${API_URL}/api/admin/products` , productData , 
    {
      headers:{
        Authorization:USER_TOKEN
      }
    }
  )
  return response.data;
})

//async thunk to update an existing product
export const updateProduct = createAsyncThunk("adminProduct/updateProduct" , async ({id , productData })=>{
  const response = await axios.put(`${API_URL}/api/admin/products/${id}` , 
    productData , 
    {
      headers:{
        Authorization:USER_TOKEN,
      }
    }
  )
  return response.data;
})


//async thunk to delete the proudct
export const deleteProduct = createAsyncThunk("adminProduct/deleteProduct" , async ({id})=>{
  const response = await axios.delete(`${API_URL}/api/admin/products/${id}` , 
    
    {
      headers:{
        Authorization:USER_TOKEN,
      }
    }
  )
  return id;
})

const adminProductSlice = createSlice({
  name:"adminProducts",
  initialState:{
    products:[],
    loading:false,
    error:null,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchAdminProducts.pending , (state)=>{
      state.loading=true;
      state.error = null;
    })
    .addCase(fetchAdminProducts.fulfilled , (state ,action)=>{
      state.loading=false;
      state.products = action.payload;
    })
    .addCase(fetchAdminProducts.rejected , (state ,action)=>{
      state.loading=false;
      state.error = action.error.message;
    })

    //add case for create products
    .addCase(createProduct.fulfilled , (state,action)=>{
      state.products.push(action.payload);
    })

    //add case for update product
    .addCase(updateProduct.fulfilled , (state,action)=>{
      const index = state.products.findIndex(
        (product=>product._id === action.payload._id)
      );
      if(index!==-1){
        state.products[index] = action.payload;
      }
    })

    //delete product
    .addCase(deleteProduct.fulfilled , (state ,action)=>{
      state.products = state.products.filter(
        (product)=>product._id!==action.payload
      )
    })

  }
})


export default adminProductSlice.reducer;