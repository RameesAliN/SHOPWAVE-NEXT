"use client"
import { setActiveFilter, setUserInput } from '@/slice/productSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';


function SearchProduct() {
  let [inputText,setInputText] = useState('')
  const dispatch = useDispatch();
  
  function handleSubmit(e:any){
    e.preventDefault();
    dispatch(setActiveFilter('ALL'));
    dispatch(setUserInput(inputText));
  }

  return  <form className="d-flex mx-auto search-form" onSubmit={handleSubmit}>
          <div className="search-wrapper">
            <input className="form-control search-input" type="search" placeholder="Search products..." onChange={((e:any)=>setInputText(e.target.value))}  />
            <button className="search-btn" type="submit">
              Search
            </button>
          </div>
        </form>
}

export default SearchProduct
