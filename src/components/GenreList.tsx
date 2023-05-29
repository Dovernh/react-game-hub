import { HStack, Image, List, ListItem, Text } from "@chakra-ui/react";
import { useGenres } from "../hooks/useGenres";
import { getCroppedImageUrl } from "../services/image-url";

export const GenreList = () => {
  const { data } = useGenres();

  return (
    <List>
      {data.map((d) => (
        <ListItem key={d.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImageUrl(d.image_background)}
            />

            <Text fontSize="large">{d.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
