import { Container,Text,ListItem,List} from '@chakra-ui/react';
import { Card } from 'react-bootstrap';


export default function Description({description,features}) {
    const handlefeatureslist = (features) => {
        let listArray = features.split(".");
        return listArray.map((item,index) => {
            return <Text key={index}>{item}</Text>
        })
    }
    return (
        <>
            <Container maxW='80%' mt={10} bg='white'p={5} >
               <Card bg='white' style={{borderRadius: '0px'}}>
                    <Card.Header style={{backgroundColor:'white'}}>
                        <Card.Title>
                            <h1>Description</h1>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {description}
                        <hr></hr>
                        <Text fontSize='lg'>Features</Text>
                        <List>
                            {handlefeatureslist(features)}
                        </List>
                    </Card.Body>
               </Card>
            </Container>
        </>
    )
}