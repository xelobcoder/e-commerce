import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import ProductTop from '../../components/productlist/ProductTop';
import Description from '../../components/productlist/description';

function ProductId() {
    const query = useRouter().query.productlistid;
    const [productdata, setProductdata] = useState([]);
    const dataRef = useRef(false);

    let fetchproduct = async () => {
        let api = await axios.get(`http://localhost:3000/api/addproduct?id=${query}`)
        return api.data
    }

    useEffect(
        () => {
            if (!dataRef.current) {
                dataRef.current = true;
                fetchproduct().then(data => {
                    console.log(data)
                    setProductdata(data)
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    dataRef.current = false;
                })
            }

        }, [query]
    )

    const handleImageClick = () => {
        window.open(`http://localhost:3000/api/image?id=${productdata[0].id}`)
    }


    return (
        <div>
            {
                productdata.length == 0 ? null : (
                    <>
                        <div>
                            <ProductTop productname={productdata[0]['name']}
                                price={productdata[0]['price']}
                                slug={productdata[0]['slug']}
                                viewimage={handleImageClick} id={query} w='50%' h={400} alt={productdata[0]['description']} />
                        </div>
                        <div>
                            <Description features={productdata[0]['features']} description={productdata[0]['description']}/>
                        </div>
                    </>
                )
            }
        </div>
    )
}


export default ProductId;