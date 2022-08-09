import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, Box, Text } from '@chakra-ui/react';

function Upload() {
    const [images, setImages] = useState({ count: 0, featureImages: [], featured: false, selected: false })
    const handle_image = (e) => {
        console.log(e.target.files)
    }
    return (
        <>
            <Container maxW='80%'>
                <Box>
                    <div className='dropdown' onClick={(e) => document.querySelector('.file-d-d').click()}>
                        <input multiple type='file' onChange={(e) => handle_image(e)} className='file-d-d'></input>
                        <div className='items'>
                            <i class="bi bi-plus"></i>
                            <Text fontSize='lg' color='blue' className='text'>click to add more images</Text>
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}


export default Upload;