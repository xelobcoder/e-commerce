import { Container, Image, Button, Text, ButtonGroup } from "@chakra-ui/react";
export default function ImagesAndAdd({ path,handler,edithandler }) {
    return (
        <>
            <Container maxW='80%' pl={5}>
                <Text fontSize="lg" pb={2} color="green">Images</Text>
                <Image width='100%' height='600px' src={path} />
                <ButtonGroup spacing={3} alignContent='end' mb={10}>
                    <Button onClick={(e) =>edithandler(e)}>edit product</Button>
                    <Button onClick={(e) => handler(e)} colorScheme='teal' color='white'>Add more Images</Button>
                </ButtonGroup>
            </Container>
        </>
    )
}