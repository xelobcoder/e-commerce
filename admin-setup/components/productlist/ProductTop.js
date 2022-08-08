import { Image, Box, Flex,Container,Stack,Text } from "@chakra-ui/react";

export default function ProductTop({ id, w, h, alt, viewimage,productname,slug,price }) {

    return (
        <>
            <Container maxW='80%' bg='white'p={5}  >
                <Flex spacing={3.5} >
                    <Image onClick={(e) => viewimage(e)} width={w} alt={alt} cursor='pointer'
                        h={h} src={`http://localhost:3000/api/image?id=${id}`} />
                    <Box ml={10}>
                        <Stack>
                            <Text fontSize='4xl'>{productname}</Text>
                            <Text color='green' cursor='pointer' fontSize='md'>{slug}</Text>
                            <Text fontSize='md'>GHC {price}</Text>
                        </Stack>
                    </Box>
                </Flex>
            </Container>
        </>
    )
}