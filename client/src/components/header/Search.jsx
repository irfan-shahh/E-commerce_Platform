
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Box, styled, ListItem ,List} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const ListWrapper=styled(List)`
position:absolute;
 background:#fff;
 color:#000;
 margin-top:36px;

`

const Search = () => {
  const dispatch=useDispatch()

      useEffect(()=>{
         dispatch(getProducts())  
      },[dispatch])

      const {products}=useSelector(state=>state.getProducts)
  
  
  const[text,setText]=useState('')

  const getText=(text)=>{
    setText(text)
  }
  return (
     <SearchContainer>
            <InputSearchBase
              placeholder="Search for products, brands and more"
              onChange={(e)=>getText(e.target.value)}
              value={text}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            {
              text &&
              <ListWrapper>
                {
                  products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                    <Link  to={`product/${product.id}`}
                    onClick={()=>setText('')}
                    style={{textDecoration:'none',color:'#000'}}>
                   
                    <ListItem >
                      {product.title.longTitle}
                    </ListItem>
                     </Link>
                  ))
                }
              </ListWrapper>
            }
           
        </SearchContainer>
  )
}

export default Search