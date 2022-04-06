import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { userInfoStateAtom, userStateAtom } from '../../data/atoms';
import {
  handleUpdateUserProfile,
  handleUserFromFirestore,
} from '../../firestore.collections';

export const UserProfileHeader = () => {
  //Get user from recoil
  const user = useRecoilValue(userStateAtom);

  //Open user info form modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef();

  //User info
  const [userInfo, setUserInfo] = useRecoilState(userInfoStateAtom);
  const title = user?.displayName;
  const avatar = user?.photoUrl;

  //set user information
  const biographyRef = useRef();
  const skillsRef = useRef();
  const locationRef = useRef();

  let updateUserData = () => {
    const userData = {
      biography: biographyRef.current.value,
      skills: skillsRef.current.value,
      location: locationRef.current.value,
    };
    setUserInfo({ ...userInfo, ...userData });
    handleUpdateUserProfile(userInfo.docId, userData).then(() => onClose());
    console.log(userData);
  };
  useEffect(() => {
    if (user) {
      handleUserFromFirestore(user.localId).then((res) => {
        setUserInfo(res);
      });
    }
  }, [user]);
  console.log(userInfo);

  return (
    <>
      {userInfo ? (
        <HStack justifyContent="center" spacing="12" p="4rem">
          <Box>
            <Image
              borderRadius="full"
              boxSize="130px"
              src={avatar}
              alt={title}
            />
          </Box>
          <VStack alignSelf="flex-start">
            <Heading align="center">{title}</Heading>
            <Text alignSelf="flex-start" color="siteGray">
              {userInfo.location}
            </Text>
            <HStack alignSelf="flex-start">
              <Button
                fontSize=".9rem"
                bgColor="white"
                border="1px solid"
                borderColor="gray.200"
                onClick={onOpen}
              >
                Edit Profile
              </Button>
              <Button
                fontSize="1rem"
                alignItems="center"
                bgColor="white"
                border="1px solid"
                borderColor="gray.200"
              >
                ...
              </Button>
            </HStack>
          </VStack>
          <Modal
            initialFocusRef={biographyRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            size={'xl'}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Biography</FormLabel>
                  <Textarea
                    ref={biographyRef}
                    defaultValue={userInfo.biography}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Skills</FormLabel>
                  <Textarea ref={skillsRef} defaultValue={userInfo.skills} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Location</FormLabel>
                  <Input ref={locationRef} defaultValue={userInfo.location} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="pink"
                  mr={3}
                  onClick={() => updateUserData()}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
      ) : (
        'Getting user info'
      )}
    </>
  );
};
