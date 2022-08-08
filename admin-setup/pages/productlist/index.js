import { useState, useEffect } from 'react';
import Image from 'next/image'
import style from '../../styles/productlist.module.css';
import axios from 'axios';
import { Input, Box, Flex, Stack, Button, Table, Modal, message } from '@chakra-ui/react';



const Card = ({ description, path, index, w, h }) => {
  return (
    <div className={style.card} >
      <div className={style.header} key={index}>
        <Image key={index} src={path} alt={description} width={w} height={h} />
      </div>
      <div className={style.body} >
        {description}
      </div>
    </div>
  )
}


const Products = ({ products }) => {
  return (
    <div >
      <div className={style.product}>
        {
          products.map((product, index) => {
            return (
              <Card key={product.id} index={index}
                description={product.description} w='300px' h='300px'
                path={`/api/image?id=${product.id}`} />
            )
          })
        }
      </div>
    </div>
  )
}


export default function ProductCategoryList(props) {
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
      <Products products={props.products} />
    </>
  )
}



export async function getServerSideProps(context) {
  let api = await axios.get('http://localhost:3000/api/addproduct')
  let products = api.data;
  return {
    props: {
      products
    }
  }
}