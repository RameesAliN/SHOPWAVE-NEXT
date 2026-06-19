"use client"

import { useDispatch, useSelector } from "react-redux";
import {setActiveFilter} from '../../slice/productSlice'


function CategoryButton(props:any) {
  const cat = props.cat;
  const {isActiveFilter} = useSelector((state:any)=>state.getProduct);
  const dispatch = useDispatch();

  return  <button className={`filter-chip ${isActiveFilter===cat? 'filter-chip-active' : ''}`} key={cat} onClick={()=>dispatch(setActiveFilter(cat))}> {cat}</button>
}

export default CategoryButton
