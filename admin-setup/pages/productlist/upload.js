import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, Box, Text, Button, ButtonGroup } from '@chakra-ui/react';
import Preview from './preview';

function Upload() {
    const [image, setImages] = useState({ count: 0, featureImages: [], featured: false, selected: false })
    const [fl, setFl] = useState([]);
    const [preview, setPreview] = useState(false);
    const handle_image = (e) => {
        let images = e.target.files;
        setImages({ ...image, featureImages: images, count: images.length })
    }


    return (
        <>
            <Container maxW='80%'>
                <Box>
                    <div className='dropdown' onClick={(e) => document.querySelector('.file-d-d').click()}>
                        <input multiple type='file' onChange={(e) => handle_image(e)} className='file-d-d'></input>
                        <div className='items'>
                            <i className="bi bi-plus"></i>
                            <Text fontSize='lg' color='blue' className='text'>click to add more images</Text>
                        </div>
                    </div>
                    {
                        image.count == 0 ? null : (
                            <ButtonGroup spacing={4} className="preview-btns">
                                <Button colorScheme='teal' onClick={() => setPreview(true)}>
                                    preview
                                </Button>
                                <Button colorScheme='blue' onClick={() => setPreview(false)}>
                                    hide
                                </Button>
                            </ButtonGroup>
                        )
                    }
                    <div className='images-preview'>
                        {
                            preview ? <Preview dataset={image} /> : null
                        }
                    </div>
                </Box>
            </Container>
        </>
    )
}


export default Upload;