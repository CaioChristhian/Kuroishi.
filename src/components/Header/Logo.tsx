import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text  
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        w="50"
        color="#01C38D"
      >
        Kuroishi
        <Text color="pink.500" as="span" ml="1">.</Text>
    </Text>
  )
}