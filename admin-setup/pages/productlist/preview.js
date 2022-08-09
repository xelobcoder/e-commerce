import { useState, useEffect } from 'react';
import { Container, Box, Image } from '@chakra-ui/react';
import Slider from "react-slick";
export default function Preview({ dataset }) {
    const [image, setImage] = useState([]);
    const [img, setImg] = useState([]);



    useEffect(() => {

        for (let i = 0; i < dataset.featureImages.length; i++) {
            let reader = new FileReader();

            reader.onload = function (e) {
                // console.log(e.target.result);
                setImage(image => [...image, e.target.result]);

            }
            reader.readAsDataURL(dataset.featureImages[i]);
        }
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    console.log(image)

    const handleSrc = (e, item) => { let reader = new FileReader(); return reader.readAsDataURL(item); }
    return (
        <>
            <Container maxW='80%' style={{ marginBottom: '60px', marginTop: '20px' }}>
                <Box>
                    {
                        image == 0 ? null : (
                            <Slider {...settings}>
                                {
                                    image.map((item, index) => {
                                        return (
                                            <Image width={200} height={400} key={index} src={item} />
                                        )
                                    })
                                }
                            </Slider>
                        )
                    }
                </Box>
            </Container>
        </>
    )
}