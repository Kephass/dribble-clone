import { FolderAddFilled, HeartFilled } from '@ant-design/icons/lib/icons';
import { Box, Image, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

export function Card({ img, title, text }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box
      position="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Image src={img} borderRadius="10" _hover={{ cursor: 'pointer' }} />
      <Box
        display={isVisible ? 'flex' : 'none'}
        cursor={isVisible ? 'pointer' : 'default'}
        borderRadius="10"
        position="absolute"
        alignItems="flex-end"
        alignContent="center"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="linear-gradient(180deg, rgba(172,172,172,0.06486344537815125) 0%, rgba(46,46,46,0.2) 47%, rgba(0,0,0,0.3) 100%);"
        justifyContent="space-between"
        p="4"
      >
        <Text fontWeight="bold" fontSize="lg" color="white" isTruncated mb="1">
          {title}
        </Text>
        <VStack bg="gray.300" p="2" borderRadius="10" ml="2" color="gray.600">
          <FolderAddFilled />
        </VStack>
        <VStack bg="gray.300" p="2" borderRadius="10" ml="2" color="gray.600">
          <HeartFilled />
        </VStack>
      </Box>
      <Text>{text}</Text>
    </Box>
  );
}
