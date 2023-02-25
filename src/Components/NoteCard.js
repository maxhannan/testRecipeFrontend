import { Box, Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

const NoteCard = ({note}) => {
  return (  
    <Box>
    <Heading size='xs' textTransform='uppercase'>
      {note.user.name}
    </Heading>
    <Text pt='2' fontSize='sm'>
      {note.content}
    </Text>
  </Box> );
}
 
export default NoteCard;