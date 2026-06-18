"use client"

import { useDispatch, useSelector } from "react-redux";
import {setActiveState} from '../../slice/categorySlice'


function CategoryButton(props:any) {
  const cat = props.cat;
  const {isActiveFilter} = useSelector((state:any)=>state.getCategory);
  const dispatch = useDispatch();

  return  <button className={`filter-chip ${isActiveFilter===cat? 'filter-chip-active' : ''}`} key={cat} onClick={()=>dispatch(setActiveState(cat))}> {cat}</button>
}

export default CategoryButton
