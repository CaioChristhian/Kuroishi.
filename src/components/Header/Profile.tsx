import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
        { showProfileData && (
          <Box mr="4" textAlign="right">
            <Text>Caio Christhian</Text>
            <Text 
              color="gray.300" 
              fontSize="small"
            >
              caiochristhianz@gmail.com
            </Text>
          </Box>
        )}

        <Avatar size="md" name="Caio Christhian" src="https://i.pinimg.com/736x/0a/85/4d/0a854df0f519b6f734090abfb4b6a8a5.jpg" />
    </Flex>
  )
}