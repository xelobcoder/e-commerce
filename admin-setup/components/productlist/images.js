import { Container ,Image, Button,Text} from "@chakra-ui/react";
export default function ImagesAndAdd({ path }) {
    return (
        <>
            <Container maxW='80%' pl={5}>
                <Text fontSize="lg" pb={2} color="green">Images</Text>
                <Image width='100%' height='600px' src={path} />
                <Button variant='yellow' color='white'>Add more Images</Button>
            </Container>
        </>
    )
}