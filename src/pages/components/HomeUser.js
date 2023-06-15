import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const HomeUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`https://user-api-pearl.vercel.app/api/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(user);
        setUser(response.data.data);
      })
      .catch((error) => {});
  });
  //   [id, user];
  const [data, setData] = useState({
    nom: user.nom,
    prenom: user.prenom,
    telephone: user.telephone,
    fritte_alloco: user.fritte_alloco,
    mdp: user.mdp,
  });
  const { nom, prenom, telephone, mdp } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(
        `https://user-api-pearl.vercel.app/api/user/${user.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      onClose();
      setData({
        nom: "",
        prenom: "",
        telephone: "",
        mdp: "",
        fritte_alloco: user.fritte_alloco,
      });
    } catch (error) {
      console.log(error.response.data.message);
      onClose();
    }
  };
  const setFileds = () => {
    setData({
      nom: user.nom,
      prenom: user.prenom,
      telephone: user.telephone,
      mdp: user.mdp,
      fritte_alloco: user.fritte_alloco,
    });
  };

  let navigate = useRouter();

  const routeChange = () => {
    let path = `/components/UserList`;
    navigate.push(path);
  };

  const deleteUser = () => {
    axios
      .delete(`https://user-api-pearl.vercel.app/api/user/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la suppression de l'utilisateur :",
          error
        );
      });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier vos information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                placeholder="nom"
                name="nom"
                value={nom}
                onChange={changeHandler}
                size="lg"
              />
              <Input
                placeholder="prenom"
                name="prenom"
                value={prenom}
                onChange={changeHandler}
                size="lg"
              />
              <Input
                placeholder="telephone"
                name="telephone"
                value={telephone}
                onChange={changeHandler}
                size="lg"
              />
              <Input
                placeholder="mot de passe"
                type="mdp"
                name="mdp"
                value={mdp}
                onChange={changeHandler}
                size="lg"
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
              }}
            >
              Ferme
            </Button>
            <Button
              bg={"#fca311"}
              mr={3}
              onClick={() => {
                updateUser();
                onClose();
              }}
            >
              Modifier
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Center w={"100%"} h={"100vh"} bg={"blue.200"} flexDirection={"column"}>
        <Text
          onClick={routeChange}
          color={"#fff"}
          fontSize={"2em"}
          cursor={"pointer"}
        >
          Voir la liste des user
        </Text>
        <Flex
          w={{ base: "90%", xl: "80%" }}
          h={{ base: "90vh", xl: "70vh" }}
          bg={"white"}
          flexDirection={{ base: "column", xl: "row" }}
        >
          <Center
            w={{ base: "100%", xl: "50%" }}
            h={{ base: "50%", xl: "100%" }}
            // justifyContent={{base:'center',xl:'left'}}
            bg={"#ffbf69"}
          >
            <WrapItem>
              <Avatar
                size="2xl"
                name="Segun Adebayo"
                src="https://bit.ly/sage-adebayo"
              />{" "}
            </WrapItem>
          </Center>
          <Center
            w={{ base: "100%", xl: "50%" }}
            h={{ base: "50%", xl: "100%" }}
          >
            <Box w={"90%"} h={"90%"}>
              {/* box bleu  */}
              <Center
                w={"70%"}
                h={"5em"}
                bg={"#0077b6"}
                color={"white"}
                fontSize={"1em"}
                fontWeight={"bold"}
                borderRadius={"5px"}
              >
                <Text>
                  {user.nom} {user.prenom}
                </Text>
                <Icon
                  as={EditIcon}
                  color={"#fca311"}
                  ml={"1em"}
                  cursor={"pointer"}
                  onClick={() => {
                    onOpen();
                    setFileds();
                  }}
                />
              </Center>
              {/* details  */}
              <Box w={"100%"} mt={"2em"}>
                <Flex>
                  <Text fontWeight={"bold"}>Telephone :</Text>
                  <Text ml={"5px"}>{user.telephone}</Text>
                </Flex>
                <Stack spacing={5} direction="row" mt={"1em"}>
                  <Checkbox
                    value={user.fritte_alloco}
                    name=""
                    // isChecked={setData({
                    //   nom: user.nom,
                    //   prenom: user.prenom,
                    //   telephone: user.telephone,
                    //   mdp: user.mdp,
                    //   fritte_alloco: "true",
                    // })}
                  >
                    Frite ?
                  </Checkbox>
                </Stack>
                <Text
                  color={"red"}
                  mt={"4em"}
                  onClick={() => {
                    deleteUser();
                    routeChange();
                  }}
                >
                  Suprimer mon profile
                </Text>
              </Box>
            </Box>
          </Center>
        </Flex>
      </Center>
    </>
  );
};

export default HomeUser;
