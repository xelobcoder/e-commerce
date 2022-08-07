import { useState, useEffect } from 'react';
import style from '../styles/Productlist.module.css';
import axios from 'axios';
import { Input, Box, Image, Flex, Stack, Button, Table, Modal, message } from '@chakra-ui/react';



const Card = () => {return (<div className={style.card}></div>)}
const Header = () => {return (<div className={style.header}></div>)}
const Body = () => {return (<div className={style.body}></div>)}


const Products = ({products}) => {
  return (
    <div >
      <div className={style.product}>
          {
            products.map( (product,index) => {
               return(
                <Card key={index}>
                  <Header>
                     <Image/>
                  </Header>
                  <Body>
                    {product.description}
                  </Body>
                </Card>
               )
            })
          }
      </div>
    </div>
  )
}


export default function ProductCategoryList(props) {
  console.log(props);
  const Filters = (props) => {
    return (
      <>
        <div className={style.filtergroup}>
          <Input placeholder='category' size='md' />
          <Input placeholder='product name' size='md' />
          <Input placeholder='' size='md' />
        </div>
        <hr></hr>
      </>
    )
  }

 
  return (
    <>
      <Filters />
      <Products products={props.products}/>
    </>
  )
}



export async function getServerSideProps(context) {
  let api = await axios.get('http://localhost:3000/api/addproduct')
  let products = api.data;
  return {
    props: {
      products:products.slice(0,20)
    }
  }
}