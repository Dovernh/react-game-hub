import { HStack, Image, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import { useGenres } from "../hooks/useGenres";
import { getCroppedImageUrl } from "../services/image-url";

export const GenreList = () => {
  const { data, isLoading, error } = useGenres();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return null;
  }

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
