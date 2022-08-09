import { useRouter } from "next/router";
import { Container,Image,Box,Stack} from "@chakra-ui/react";

export default function ImagesScroll() {
    const query = useRouter().query.productlistid;
    return (
        <>
            <Container maxW='80%'>
                <h1>{query}</h1>
            </Container>
        </>
    )
}